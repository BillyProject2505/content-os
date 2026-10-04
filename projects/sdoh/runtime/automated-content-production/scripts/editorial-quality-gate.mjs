const STOPWORDS = new Set([
  "yang","dan","di","ke","dari","untuk","dengan","pada","itu","ini","ada","atau",
  "bisa","boleh","tidak","tak","kamu","dirimu","lebih","tetap","sebagai","saat",
  "ketika","karena","juga","jadi","agar","dalam","sebuah","satu","sama"
]);

export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function words(value) {
  return normalizeText(value).split(/\s+/).filter(Boolean);
}

export function contentWords(value) {
  return words(value).filter((word) => word.length >= 3 && !STOPWORDS.has(word));
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 && B.size === 0) return 1;
  const intersection = [...A].filter((x) => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : intersection / union;
}

export function anchorGroupHit(text, group) {
  const normalized = normalizeText(text);
  return group.some((entry) => normalized.includes(normalizeText(entry)));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^$(){}|[\]\\]/g, "\\$&");
}

function bodyWithoutSignatureAndHashtags(caption, guardrails) {
  let body = String(caption ?? "");
  const signature = guardrails.caption_required_signature;
  if (signature) {
    body = body.replace(new RegExp(escapeRegExp(signature), "ig"), " ");
  }
  for (const hashtag of guardrails.caption_required_hashtags || []) {
    body = body.replace(new RegExp(escapeRegExp(hashtag), "ig"), " ");
  }
  return body.trim();
}

export function assessEditorialQuality(candidate, guardrails) {
  const issues = [];
  const slides = candidate?.slides || [];
  const slideWordCounts = slides.map((slide) => words(slide.copy).length);
  const minPerSlide = guardrails.min_words_per_slide || [];
  const maxPerSlide = guardrails.max_words_per_slide || [];

  slideWordCounts.forEach((count, index) => {
    if (count < minPerSlide[index]) {
      issues.push("S" + (index + 1) + "_TOO_SPARSE:" + count + "<" + minPerSlide[index]);
    }
    if (count > maxPerSlide[index]) {
      issues.push("S" + (index + 1) + "_TOO_DENSE:" + count + ">" + maxPerSlide[index]);
    }
  });

  const totalSlideWords = slideWordCounts.reduce((sum, n) => sum + n, 0);
  if (totalSlideWords < guardrails.min_total_slide_words) {
    issues.push("TOTAL_SLIDE_DENSITY_LOW:" + totalSlideWords + "<" + guardrails.min_total_slide_words);
  }

  const allContentWords = slides.flatMap((slide) => contentWords(slide.copy));
  const uniqueSlideContentWords = new Set(allContentWords).size;
  if (uniqueSlideContentWords < guardrails.min_unique_slide_content_words) {
    issues.push("VOCABULARY_TOO_THIN:" + uniqueSlideContentWords + "<" + guardrails.min_unique_slide_content_words);
  }

  let maxPairwiseSimilarity = 0;
  for (let i = 0; i < slides.length; i += 1) {
    for (let j = i + 1; j < slides.length; j += 1) {
      const similarity = jaccard(contentWords(slides[i].copy), contentWords(slides[j].copy));
      maxPairwiseSimilarity = Math.max(maxPairwiseSimilarity, similarity);
    }
  }
  if (maxPairwiseSimilarity > guardrails.max_pairwise_content_similarity) {
    issues.push("SLIDES_TOO_REPETITIVE:" + maxPairwiseSimilarity.toFixed(3) + ">" + guardrails.max_pairwise_content_similarity);
  }

  for (const requirement of guardrails.slide_progression || []) {
    const slide = slides[requirement.slide - 1];
    if (!slide) {
      issues.push("PROGRESSION_S" + requirement.slide + "_MISSING");
      continue;
    }
    const hitCount = requirement.required_anchor_groups.filter((group) =>
      anchorGroupHit(slide.copy, group)
    ).length;
    if (hitCount < requirement.minimum_groups) {
      issues.push(
        "PROGRESSION_S" + requirement.slide + "_FAILED:" + hitCount + "/" + requirement.required_anchor_groups.length
      );
    }
  }

  const caption = String(candidate?.caption ?? "");
  const captionBody = bodyWithoutSignatureAndHashtags(caption, guardrails);
  const captionBodyWords = words(captionBody).length;
  if (captionBodyWords < guardrails.caption_min_body_words) {
    issues.push("CAPTION_TOO_SHORT:" + captionBodyWords + "<" + guardrails.caption_min_body_words);
  }
  if (captionBodyWords > guardrails.caption_max_body_words) {
    issues.push("CAPTION_TOO_LONG:" + captionBodyWords + ">" + guardrails.caption_max_body_words);
  }

  const bodyParagraphs = captionBody
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (bodyParagraphs.length < guardrails.caption_min_body_paragraphs) {
    issues.push("CAPTION_STRUCTURE_THIN:" + bodyParagraphs.length + "<" + guardrails.caption_min_body_paragraphs);
  }

  if (!normalizeText(caption).includes(normalizeText(guardrails.caption_required_signature))) {
    issues.push("CAPTION_SIGNATURE_MISSING");
  }

  for (const hashtag of guardrails.caption_required_hashtags || []) {
    if (!caption.toLowerCase().includes(hashtag.toLowerCase())) {
      issues.push("CAPTION_HASHTAG_MISSING:" + hashtag);
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    metrics: {
      slide_word_counts: slideWordCounts,
      total_slide_words: totalSlideWords,
      unique_slide_content_words: uniqueSlideContentWords,
      max_pairwise_content_similarity: Number(maxPairwiseSimilarity.toFixed(3)),
      caption_body_words: captionBodyWords,
      caption_body_paragraphs: bodyParagraphs.length,
    },
  };
}
