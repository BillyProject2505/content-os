import fs from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

// Static governance regression: protect cross-project identity and typed render.
const probe = fs.readFileSync(".github/workflows/cwc-drive-readonly-asset-probe.yml", "utf8");
const renderer = fs.readFileSync(".github/workflows/cwc-carousel-review-render.yml", "utf8");
const workflows = [probe, renderer];

test("both CWC workflows require a dedicated CWC Drive service account", () => {
  for (const yaml of workflows) {
    assert.match(yaml, /service_account: \$\{\{ vars\.CWC_GCP_SERVICE_ACCOUNT \}\}/);
    assert.match(yaml, /CWC_SERVICE_ACCOUNT: \$\{\{ vars\.CWC_GCP_SERVICE_ACCOUNT \}\}/);
    assert.doesNotMatch(yaml, /service_account: \$\{\{ vars\.GCP_SERVICE_ACCOUNT \}\}/);
    assert.match(yaml, /Never|never|SDOH/);
    assert.match(yaml, /drive\.readonly/);
  }
});
test("both workflows are manually gated on main before Drive access", () => {
  for (const yaml of workflows) {
    assert.match(yaml, /github\.event_name == 'workflow_dispatch' && github\.ref == 'refs\/heads\/main'/);
    const precheck = yaml.indexOf("name: Enforce CWC-only Drive identity");
    const auth = yaml.indexOf("uses: google-github-actions/auth@v3");
    assert.ok(precheck > 0 && precheck < auth);
    assert.match(yaml, /id-token: write/);
  }
});
test("render plan keeps immutable frozen copy and passes typed layout to compositor", () => {
  assert.match(renderer, /--plan "\$RUNNER_TEMP\/cwc-review\/render-plan\.json" \\\n[\s\S]*?--layout "\$layout" \\\n[\s\S]*?--out "\$RUNNER_TEMP\/cwc-review\/render-plan-typed\.json"/);
  assert.match(renderer, /python projects\/cwc\/runtime\/approved-copy\/render-carousel\.py \\\n\s+--plan "\$RUNNER_TEMP\/cwc-review\/render-plan-typed\.json"/);
  assert.doesNotMatch(renderer, /python projects\/cwc\/runtime\/approved-copy\/render-carousel\.py \\\n\s+--plan "\$RUNNER_TEMP\/cwc-review\/render-plan\.json"/);
});
test("CWC Drive probe has no publication or arbitrary asset upload", () => {
  assert.doesNotMatch(probe, /instagram|graph\.facebook|publish-media|schedule-cron/i);
  assert.match(probe, /read_only_drive_probe:/);
  assert.match(probe, /check-drive-assets\.sh/);
});
