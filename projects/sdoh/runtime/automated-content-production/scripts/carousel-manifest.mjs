// Deterministic SDOH carousel render manifest (BUS-49 v0.6.0 input).
// Production Path supports Sage and Burgundy while preserving the Optional
// Generation Path's canonical Sage default plan.
//
// Copy is only wrapped (line breaks); it is never rewritten.

export function wrapCopy(copy) {
  const words = String(copy).trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return words.join("");
  if (words.length === 2) return words.join("\n");
  if (words.length === 3) {
    const first = words[0].length;
    if (first >= 8) return `${words[0]}\n${words.slice(1).join(" ")}`;
    return `${words.slice(0, 2).join(" ")}\n${words[2]}`;
  }
  if (words.length === 4) {
    return `${words.slice(0, 2).join(" ")}\n${words.slice(2).join(" ")}`;
  }
  const pivot = Math.ceil(words.length / 2);
  return `${words.slice(0, pivot).join(" ")}\n${words.slice(pivot).join(" ")}`;
}

function assertVisualPlan(plan, label) {
  if (!plan || typeof plan !== "object") {
    throw new Error(`${label} visual plan missing`);
  }
  if (
    plan.layout_mode !== "illustrated_single_character" ||
    !["lower_right", "lower_center"].includes(plan.anchor) ||
    !["md", "lg"].includes(plan.scale) ||
    plan.ground_mode !== "embedded" ||
    !Array.isArray(plan.pose_route) ||
    plan.pose_route.length !== 5 ||
    plan.pose_route.some((pose) => !/^P0[1-8]$/.test(pose))
  ) {
    throw new Error(`${label} visual plan mismatch`);
  }
  return plan;
}

function wrapSageCopy(copy) {
  const words = String(copy).trim().split(/\s+/).filter(Boolean);
  const TARGET_CHARS = 24;
  const MAX_LINES = Math.min(3, words.length);

  const line = (from, to) => words.slice(from, to).join(" ");
  const score = (lines, counts) => {
    const lengths = lines.map((entry) => entry.length);
    const orphanPenalty = counts.filter((count) => count === 1).length;
    const maxLength = Math.max(...lengths);
    const minLength = Math.min(...lengths);
    const mean = lengths.reduce((sum, value) => sum + value, 0) / lengths.length;
    const variance = lengths.reduce((sum, value) => sum + ((value - mean) ** 2), 0);
    return [orphanPenalty, maxLength, maxLength - minLength, variance];
  };
  const better = (a, b) => {
    for (let i = 0; i < a.score.length; i += 1) {
      if (a.score[i] !== b.score[i]) return a.score[i] < b.score[i];
    }
    return false;
  };

  for (let lineCount = 2; lineCount <= MAX_LINES; lineCount += 1) {
    const candidates = [];
    if (lineCount === 2) {
      for (let i = 1; i < words.length; i += 1) {
        const lines = [line(0, i), line(i, words.length)];
        const counts = [i, words.length - i];
        if (Math.max(...lines.map((entry) => entry.length)) <= TARGET_CHARS) {
          candidates.push({ lines, score: score(lines, counts) });
        }
      }
    } else {
      for (let i = 1; i < words.length - 1; i += 1) {
        for (let j = i + 1; j < words.length; j += 1) {
          const lines = [line(0, i), line(i, j), line(j, words.length)];
          const counts = [i, j - i, words.length - j];
          if (Math.max(...lines.map((entry) => entry.length)) <= TARGET_CHARS) {
            candidates.push({ lines, score: score(lines, counts) });
          }
        }
      }
    }
    if (candidates.length > 0) {
      let best = candidates[0];
      for (const candidate of candidates.slice(1)) {
        if (better(candidate, best)) best = candidate;
      }
      return best.lines.join("\n");
    }
  }

  throw new Error("Sage copy cannot fit deterministic three-line width budget");
}

function wrapBurgundyCopy(copy) {
  const words = String(copy).trim().split(/\s+/).filter(Boolean);
  const MAX_LINES = 3;
  const TARGET_CHARS = 24;
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && candidate.length > TARGET_CHARS && lines.length < MAX_LINES - 1) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  if (lines.length > MAX_LINES) {
    throw new Error("Burgundy copy requires more than three deterministic lines");
  }
  return lines.join("\n");
}

export function assertCanonicalSageVisualPlan(authority) {
  const plan = assertVisualPlan(authority.sage_default_visual_plan, "Canonical Sage");
  if (JSON.stringify(plan.pose_route) !== JSON.stringify(["P02", "P03", "P05", "P06", "P07"])) {
    throw new Error("Canonical Sage visual plan mismatch");
  }
  return plan;
}

export function resolveVisualPlan({ contentId, theme, authority }) {
  if (theme === "SAGE") {
    return assertCanonicalSageVisualPlan(authority);
  }
  if (theme === "BURGUNDY") {
    const plan = authority.content_visual_plans?.[contentId];
    return assertVisualPlan(plan, `Burgundy ${contentId}`);
  }
  throw new Error(`Unsupported carousel theme: ${theme}`);
}

export function buildCarouselRenderManifest({ contentId, theme, slides, authority, lineBreakPolicy = "legacy" }) {
  const plan = resolveVisualPlan({ contentId, theme, authority });
  return {
    content_id: contentId,
    theme,
    layout_mode: plan.layout_mode,
    slides: slides.map((slide, index) => ({
      slide_number: slide.slide,
      copy: theme === "BURGUNDY" ? wrapBurgundyCopy(slide.copy) : (lineBreakPolicy === "width_budget" ? wrapSageCopy(slide.copy) : wrapCopy(slide.copy)),
      optical_y_correction: 0,
      character: {
        enabled: true,
        pose_id: plan.pose_route[index],
        anchor: plan.anchor,
        scale: plan.scale,
        ground_mode: plan.ground_mode,
      },
    })),
  };
}

// Backward-compatible wrapper for the Optional Generation Path pilot.
export function buildSageRenderManifest({ contentId, slides, authority }) {
  return buildCarouselRenderManifest({
    contentId,
    theme: "SAGE",
    slides,
    authority,
  });
}
