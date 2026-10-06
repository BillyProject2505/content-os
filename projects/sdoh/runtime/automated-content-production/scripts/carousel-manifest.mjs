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

export function buildCarouselRenderManifest({ contentId, theme, slides, authority }) {
  const plan = resolveVisualPlan({ contentId, theme, authority });
  return {
    content_id: contentId,
    theme,
    layout_mode: plan.layout_mode,
    slides: slides.map((slide, index) => ({
      slide_number: slide.slide,
      copy: wrapCopy(slide.copy),
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
