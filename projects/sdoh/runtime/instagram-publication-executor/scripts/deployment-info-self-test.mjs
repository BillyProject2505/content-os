import { deploymentInfo } from "../src/deployment-info.js";
const sha = "48abee1".padEnd(40, "0");
const tagged = deploymentInfo({ CF_VERSION_METADATA: { id: "v-1", tag: sha, timestamp: "2026-10-06T09:22:00Z" } });
if (tagged.provenance !== "TAGGED_COMMIT" || tagged.commit_sha !== sha) throw new Error("tagged commit not reported");
for (const env of [{}, { CF_VERSION_METADATA: { id: "v-2", tag: "" } }, { CF_VERSION_METADATA: { id: "v-3", tag: "manual" } }]) {
  const info = deploymentInfo(env);
  if (info.provenance !== "UNVERIFIED" || info.commit_sha !== null) throw new Error("untagged deploy must be UNVERIFIED");
}
console.log("deployment provenance self-test PASS");
