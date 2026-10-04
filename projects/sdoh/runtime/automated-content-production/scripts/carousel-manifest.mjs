// Deterministic Sage carousel render manifest (BUS-49 v0.6.0 input).
// Shared by the approved-copy Production Path and the Optional Generation Path:
// one implementation of the line-break policy and the canonical visual plan.
// The copy is only wrapped (line breaks); it is never rewritten.

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

export function assertCanonicalSageVisualPlan(authority) {
  const plan = authority.sage_default_visual_plan;
  if (
    plan.layout_mode !== "illustrated_single_character" ||
    plan.anchor !== "lower_right" ||
    plan.scale !== "md" ||
    plan.ground_mode !== "embedded" ||
    JSON.stringify(plan.pose_route) !== JSON.stringify(["P02", "P03", "P05", "P06", "P07"])
  ) {
    throw new Error("Canonical Sage visual plan mismatch");
  }
  return plan;
}

export function buildSageRenderManifest({ contentId, slides, authority }) {
  const plan = assertCanonicalSageVisualPlan(authority);
  return {
    content_id: contentId,
    theme: "SAGE",
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
