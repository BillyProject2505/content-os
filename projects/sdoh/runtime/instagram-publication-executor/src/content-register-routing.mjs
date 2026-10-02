export const CAROUSEL_REGISTER_ROUTES = Object.freeze({
  BURGUNDY: Object.freeze({
    theme: "BURGUNDY",
    format: "carousel",
    content_id_prefix: "SDOH-BURGUNDY-CAR-",
    register_document_id: "346b4c0c-9aec-4454-a2b5-06210b2c88c6",
  }),
  SAGE: Object.freeze({
    theme: "SAGE",
    format: "carousel",
    content_id_prefix: "SDOH-SAGE-CAR-",
    register_document_id: "458e4dc3-a1a6-4a44-ab6e-afefa1d28eba",
  }),
});

export function resolveCarouselRegister(contentId) {
  const normalized = String(contentId ?? "").trim();

  if (/^SDOH-BURGUNDY-CAR-\d{4}$/.test(normalized)) {
    return {
      ...CAROUSEL_REGISTER_ROUTES.BURGUNDY,
      content_id: normalized,
    };
  }

  if (/^SDOH-SAGE-CAR-\d{4}$/.test(normalized)) {
    return {
      ...CAROUSEL_REGISTER_ROUTES.SAGE,
      content_id: normalized,
    };
  }

  return null;
}

export function requireCarouselRegister(contentId) {
  const route = resolveCarouselRegister(contentId);
  if (!route) {
    throw Object.assign(
      new Error("UNSUPPORTED_CAROUSEL_CONTENT_ID"),
      { code: "UNSUPPORTED_CAROUSEL_CONTENT_ID" }
    );
  }
  return route;
}

export function assertRegisterMatchesContentId(contentId, registerDocumentId) {
  const route = requireCarouselRegister(contentId);
  if (String(registerDocumentId ?? "").trim() !== route.register_document_id) {
    throw Object.assign(
      new Error("REGISTER_DOCUMENT_ROUTE_MISMATCH"),
      { code: "REGISTER_DOCUMENT_ROUTE_MISMATCH" }
    );
  }
  return route;
}
