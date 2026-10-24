#!/usr/bin/env bash
# BUS-170: read-only Drive byte-integrity checker for exact CWC asset pins.
# Network host is pinned, redirects disallowed, assets never uploaded/shared.
set -euo pipefail
umask 077

pins="projects/cwc/runtime/approved-copy/blue-dark-asset-pins.json"
target="$CWC_ASSET_DIR"
: "$ACCESS_TOKEN"
[[ -n "$target" && -n "$ACCESS_TOKEN" ]] || { echo "::error::Missing ephemeral output path or read-only token"; exit 1; }
test -f "$pins" || { echo "::error::Missing CWC asset pin file"; exit 1; }
mkdir -p "$target"

count="$(jq -r '.assets | keys | length' "$pins")"
[[ "$count" == "7" ]] || { echo "::error::Unexpected CWC role count"; exit 1; }
jq -e '.schema == "cwc-render-asset-pins-v1" and .surface == "BLUE_DARK" and .presenter_variant == "WHITE_POINT_LEFT"' "$pins" >/dev/null ||
  { echo "::error::Unexpected CWC asset-pin contract"; exit 1; }

for role in presenter logo footer montserrat_bold montserrat_medium montserrat_semibold montserrat_extrabold; do
  file_id="$(jq -r --arg k "$role" '.assets[$k].drive_file_id // empty' "$pins")"
  name="$(jq -r --arg k "$role" '.assets[$k].file_name // empty' "$pins")"
  expected_sha="$(jq -r --arg k "$role" '.assets[$k].sha256 // empty' "$pins")"
  [[ "$file_id" =~ ^[A-Za-z0-9_-]{15,100}$ ]] || { echo "::error::Invalid Drive ID for $role"; exit 1; }
  [[ "$name" =~ ^[A-Za-z0-9_.-]+$ && "$name" != "." && "$name" != ".." ]] ||
    { echo "::error::Unsafe filename for $role"; exit 1; }
  [[ "$expected_sha" =~ ^[0-9a-f]{64}$ ]] || { echo "::error::Bad SHA-256 pin for $role"; exit 1; }

  # No follow redirects: Authorization may never travel to a second domain.
  # Retry disabled; no error-response body or token appears in workflow logs.
  status="$(curl --silent --show-error --output "$target/$name" --write-out '%{http_code}' \
    --proto '=https' --max-redirs 0 --connect-timeout 15 --max-time 90 --retry 0 \
    --header "Authorization: Bearer $ACCESS_TOKEN" \
    "https://www.googleapis.com/drive/v3/files/$file_id?alt=media")"
  if [[ "$status" != "200" || ! -s "$target/$name" ]]; then
    rm -f "$target/$name"
    echo "::error::CWC Drive read failed for $role: HTTP $status. Check WIF identity and per-file read permission."
    exit 1
  fi
  actual_sha="$(sha256sum "$target/$name" | awk '{print $1}')"
  if [[ "$actual_sha" != "$expected_sha" ]]; then
    rm -f "$target/$name"
    echo "::error::CWC asset byte checksum mismatch for $role. Review CAR/CAB/CRS before updating pins."
    exit 1
  fi
  echo "PASS $role byte-verified SHA-256"
done
echo "CWC_DRIVE_READONLY_BYTES_PASS: seven verified assets. No content state, approval or publication authority."
