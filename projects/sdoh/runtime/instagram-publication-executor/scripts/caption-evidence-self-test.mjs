import assert from 'node:assert/strict';
import {compareCaptionEvidence, isProspectiveExactTerminalLfOmission} from '../src/instagram-carousel-executor.js';
const exact=await compareCaptionEvidence('Body\n#old\n','Body\n#old\n');
assert.equal(exact.line_endings_normalized_equal,true);
const newline=await compareCaptionEvidence('Body\n#old\n','Body\n#old');
assert.equal(newline.line_endings_normalized_equal,false);
assert.equal(newline.equal_without_final_newlines,true);
assert.notEqual(newline.expected_sha256,newline.remote_sha256);
const tags=await compareCaptionEvidence('Body\n#old\n','Body\n#new');
assert.equal(tags.non_hashtag_text_equal,true);
assert.equal(tags.equal_without_final_newlines,false);
assert.deepEqual(tags.remote_hashtag_lines,['#new']);
const body=await compareCaptionEvidence('Body\n#old','Changed\n#old');
assert.equal(body.non_hashtag_text_equal,false);
console.log('Caption evidence diagnostics PASS: exact, newline, hashtag-only, narrative difference; comparison does not authorize reconciliation.');
const prospective = "2026-11-16T11:30:52+0000";
const historic = "2026-11-15T11:30:52+0000";
assert.equal(isProspectiveExactTerminalLfOmission("Body\n#tags\n","Body\n#tags",prospective),true);
assert.equal(isProspectiveExactTerminalLfOmission("Body\n#tags\n","Body\n#tags",historic),false);
for (const [expected, actual] of [
  ["Body\n#tags\n","Changed\n#tags"],
  ["Body\n#tags\n","Body\n#changed"],
  ["Body\n#tags\n","Body\n#tags "],
  ["Body\n#tags\n","Body\n#tags\n"],
  ["Body\n#tags\n\n","Body\n#tags"],
  ["Body\n#tags","Body\n#tags"],
  ["Body\n#tags\n","Body\n#tags\n\n"],
]) {
  assert.equal(isProspectiveExactTerminalLfOmission(expected,actual,prospective),false);
}
assert.equal(isProspectiveExactTerminalLfOmission("Body\n","Body","not-a-time"),false);
console.log("Prospective one-terminal-LF normalization PASS: future-only exact bytes; narrative, hashtag and whitespace changes rejected.");
