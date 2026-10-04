// Deterministic generation guidance derived only from the canonical request's
// guardrails. Nothing here relaxes or re-implements a gate: the Semantic
// Alignment and Editorial Quality gates remain the sole acceptance authority.
import {
  anchorGroupHit,
  assessEditorialQuality,
  contentWords,
  normalizeText,
  words,
} from "./editorial-quality-gate.mjs";
import { MAX_REMEDIATION_HINT_LENGTH } from "./model-generation-contract.mjs";

// The Gentle Naming density shape (sparse → light → peak → release → sparse)
// mapped onto each slide's own gate window, so "sparse" never means a fragment.
const DENSITY_SHAPE = ["sparse", "light", "peak", "release", "sparse"];

export function slideWordTargets(guardrails) {
  const targets = guardrails.min_words_per_slide.map((min, index) => {
    const max = guardrails.max_words_per_slide[index];
    const density = DENSITY_SHAPE[index] ?? "light";
    const clamp = (n) => Math.min(max, Math.max(min, n));
    let low;
    let high;
    if (density === "sparse") {
      low = min;
      high = clamp(min + 1);
    } else if (density === "peak") {
      low = clamp(max - 2);
      high = max;
    } else {
      low = clamp(min + 1);
      high = clamp(min + 3);
    }
    return { slide: index + 1, density, low, high, min, max };
  });
  // Keep the sum of lower targets at or above the gate's total-word floor,
  // raising the heaviest slides first (peak, then light/release, then sparse).
  const order = ["peak", "light", "release", "sparse"];
  let deficit = (guardrails.min_total_slide_words ?? 0) - targets.reduce((sum, t) => sum + t.low, 0);
  while (deficit > 0) {
    const next = order
      .flatMap((density) => targets.filter((t) => t.density === density))
      .find((t) => t.low < t.max);
    if (!next) break;
    next.low += 1;
    next.high = Math.max(next.high, next.low);
    deficit -= 1;
  }
  return targets;
}

export function captionParagraphTarget(guardrails) {
  const paragraphs = guardrails.caption_min_body_paragraphs;
  const low = Math.ceil(guardrails.caption_min_body_words / paragraphs) + 3;
  const high = Math.max(low, Math.min(Math.floor(guardrails.caption_max_body_words / paragraphs), low + 12));
  return { paragraphs, low, high };
}

function quoteList(group) {
  return group.map((entry) => `"${entry}"`).join(" or ");
}

export function slideRequirementLines(guardrails) {
  const targets = slideWordTargets(guardrails);
  return guardrails.slide_progression.map((requirement) => {
    const target = targets[requirement.slide - 1];
    const groups = requirement.required_anchor_groups.map((group) => `(${quoteList(group)})`);
    const need =
      requirement.minimum_groups >= requirement.required_anchor_groups.length
        ? `MUST contain ${groups.join(" AND ")}`
        : `MUST contain at least ${requirement.minimum_groups} of ${groups.join(", ")}`;
    return `S${requirement.slide} [${target.density}]: ${target.low}-${target.high} words (gate ${target.min}-${target.max}); ${need}.`;
  });
}

// A content word is protected on a slide when it carries one of that slide's
// required progression anchors, or one of the global semantic anchors.
// Protected occurrences are never offered as replacement candidates.
function isProtected(word, slideGroups, semanticGroups) {
  const entries = [...slideGroups, ...semanticGroups].flat();
  return entries.some((entry) =>
    words(entry).some((anchorWord) => anchorWord.length >= 3 && word.includes(anchorWord))
  );
}

// Deterministic repeated-word candidates: content words used 2+ times across
// slides with at least one unprotected occurrence. Ordered by count desc, then
// alphabetically; slides list only where replacement is allowed.
export function repeatedWordCandidates(slides, editorial, semantic) {
  const stats = new Map();
  editorial.slide_progression.forEach((requirement) => {
    const copy = slides[requirement.slide - 1]?.copy ?? "";
    for (const word of contentWords(copy)) {
      const entry = stats.get(word) ?? { word, count: 0, replaceable: [] };
      entry.count += 1;
      if (!isProtected(word, requirement.required_anchor_groups, semantic.required_slide_anchor_groups)) {
        if (!entry.replaceable.includes(requirement.slide)) entry.replaceable.push(requirement.slide);
      }
      stats.set(word, entry);
    }
  });
  return [...stats.values()]
    .filter((entry) => entry.count >= 2 && entry.replaceable.length > 0)
    .sort((a, b) => b.count - a.count || (a.word < b.word ? -1 : a.word > b.word ? 1 : 0));
}

function truncate(text, limit) {
  const value = String(text ?? "").replace(/\s+/g, " ").trim();
  return value.length <= limit ? value : value.slice(0, limit - 1) + "…";
}

// Builds a bounded, deterministic remediation hint for the next attempt from
// the rejected candidate and the canonical request guardrails.
export function buildRemediationHint({ request, rejectedCandidate, gateCode, gateReason, attempt }) {
  const editorial = request.editorial_quality_guardrails;
  const semantic = request.semantic_guardrails;
  const slides = rejectedCandidate?.slides ?? [];
  const targets = slideWordTargets(editorial);
  const assessment = assessEditorialQuality(rejectedCandidate ?? {}, editorial);
  // Target-aware density: when the total-word gate fails, slides that are
  // inside the gate window but below their generation target are named.
  const totalDensityLow = assessment.metrics.total_slide_words < editorial.min_total_slide_words;
  const lines = [
    `Attempt ${attempt} was rejected by ${gateCode}. Gate codes: ${truncate(gateReason, 300)}.`,
    "Rewrite all five slides and the caption from scratch. Fix every item below; keep everything that already passes.",
  ];

  editorial.slide_progression.forEach((requirement) => {
    const index = requirement.slide - 1;
    const copy = slides[index]?.copy ?? "";
    const count = words(copy).length;
    const target = targets[index];
    const missing = requirement.required_anchor_groups.filter((group) => !anchorGroupHit(copy, group));
    const hits = requirement.required_anchor_groups.length - missing.length;
    const problems = [];
    if (count < target.min || count > target.max) {
      problems.push(`${count} words, need ${target.low}-${target.high}`);
    } else if (totalDensityLow && count < target.low) {
      problems.push(`${count} words, below target ${target.low}-${target.high}: add ${target.low - count} word(s)`);
    }
    if (hits < requirement.minimum_groups) problems.push(`add ${missing.map((g) => `(${quoteList(g)})`).join(" and ")}`);
    const forbidden = semantic.forbidden_slide_phrases.filter((phrase) =>
      normalizeText(copy).includes(normalizeText(phrase))
    );
    if (forbidden.length) problems.push(`remove "${forbidden.join('", "')}"`);
    lines.push(
      `S${requirement.slide} "${truncate(copy, 70)}": ${problems.length ? problems.join("; ") : "ok"}.`
    );
  });

  const allSlideText = slides.map((slide) => slide.copy).join(" ");
  const missingCore = semantic.required_slide_anchor_groups.filter((group) => !anchorGroupHit(allSlideText, group));
  const coreHits = semantic.required_slide_anchor_groups.length - missingCore.length;
  if (coreHits < semantic.minimum_required_slide_anchor_groups) {
    lines.push(`Across slides also use ${missingCore.map((g) => `(${quoteList(g)})`).join(" and ")}.`);
  }
  const metrics = assessment.metrics;
  if (metrics.total_slide_words < editorial.min_total_slide_words) {
    lines.push(`Slides total ${metrics.total_slide_words} words; need at least ${editorial.min_total_slide_words}. Add words only to slides marked below target; leave slides marked ok at their length.`);
  }
  if (metrics.unique_slide_content_words < editorial.min_unique_slide_content_words) {
    lines.push(`Use more varied words: ${metrics.unique_slide_content_words} distinct content words, need ${editorial.min_unique_slide_content_words}.`);
    const repeated = repeatedWordCandidates(slides, editorial, semantic).slice(0, 5);
    if (repeated.length) {
      lines.push(
        "Repeated words: " +
          repeated
            .map((entry) => `"${entry.word}" x${entry.count} (replace in ${entry.replaceable.map((n) => `S${n}`).join(", ")})`)
            .join("; ") +
          ". Replace some of those occurrences with context-appropriate words that keep the meaning; do not replace required anchor words and do not add unrelated vocabulary."
      );
    }
  }
  if (metrics.max_pairwise_content_similarity > editorial.max_pairwise_content_similarity) {
    lines.push("Two slides repeat each other; give every slide a different thought.");
  }
  const caption = captionParagraphTarget(editorial);
  if (
    metrics.caption_body_paragraphs < editorial.caption_min_body_paragraphs ||
    metrics.caption_body_words < editorial.caption_min_body_words ||
    metrics.caption_body_words > editorial.caption_max_body_words
  ) {
    lines.push(
      `Caption body had ${metrics.caption_body_paragraphs} paragraph(s), ${metrics.caption_body_words} words; return exactly ${caption.paragraphs} paragraphs of ${caption.low}-${caption.high} words each.`
    );
  }

  let hint = lines.join(" ");
  if (hint.length > MAX_REMEDIATION_HINT_LENGTH) {
    hint = hint.slice(0, MAX_REMEDIATION_HINT_LENGTH - 1) + "…";
  }
  return hint;
}
