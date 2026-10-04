// Editorial helper: prints (or with --write stores) the copy_fingerprint of a
// copy file. Run after the Owner/editorial review settles the text; record the
// printed fingerprint with the approval so the render run can pin it.
import fs from "node:fs";
import path from "node:path";
import { sealCopyFingerprint } from "./approved-copy-contract.mjs";

const file = process.argv[2];
if (!file) {
  console.error("usage: seal-approved-copy.mjs <copy.json> [--write]");
  process.exit(2);
}
try {
  const input = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  const fingerprint = sealCopyFingerprint(input);
  if (process.argv.includes("--write")) {
    fs.writeFileSync(path.resolve(file), JSON.stringify({ ...input, copy_fingerprint: fingerprint }, null, 2) + "\n");
  }
  console.log(`copy_fingerprint=${fingerprint}`);
} catch (error) {
  console.error(`SEAL_REJECTED code=${error?.code ?? "ERROR"}: ${error.message}`);
  process.exit(1);
}
