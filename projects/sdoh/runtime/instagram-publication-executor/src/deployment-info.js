// Deployed Worker provenance (BUS-140 remediation Phase 9).
//
// The canonical deploy path (sdoh-publication-worker-deploy.yml) deploys with
// `wrangler deploy --tag <git commit sha>`. The version_metadata binding
// exposes that tag at runtime, so /health can prove which audited commit is
// live. A deployment from any other path (no tag, or a non-SHA tag) is
// reported as provenance UNVERIFIED.
export function deploymentInfo(env) {
  const metadata = env?.CF_VERSION_METADATA ?? null;
  const tag = typeof metadata?.tag === "string" ? metadata.tag : "";
  const commitTag = /^[0-9a-f]{40}$/.test(tag);
  return {
    version_id: typeof metadata?.id === "string" ? metadata.id : null,
    version_tag: tag || null,
    version_timestamp: typeof metadata?.timestamp === "string" ? metadata.timestamp : null,
    commit_sha: commitTag ? tag : null,
    provenance: commitTag ? "TAGGED_COMMIT" : "UNVERIFIED",
  };
}
