#!/usr/bin/env bash
#
# Guardrail: prove /mobile-mechanic's prerendered output is unchanged.
#
# /mobile-mechanic is the only service page currently earning meaningful organic
# impressions, and the whole point of the service-page differentiation work is to
# improve the OTHER pages without disturbing it. Every task in that plan runs this
# check; a failure means stop and investigate before shipping.
#
# Why this is not a plain `diff`: Vite emits a single content-hashed JS bundle, and
# its filename appears in the <script src> tag of every prerendered page. Any change
# to any runtime code anywhere in the app changes that hash, so a byte-for-byte diff
# reports a difference even when /mobile-mechanic itself is untouched. This script
# normalises the hashed asset filenames — and ONLY those — so the comparison covers
# what actually matters: markup, text, meta tags and JSON-LD.
#
# Usage (from the repo root, after `npm run build`):
#   bash scripts/check-mobile-mechanic-guardrail.sh
#
# Exit 0 and print GUARDRAIL PASS when unchanged; exit 1 and print the diff otherwise.

set -euo pipefail

BUILT="dist/mobile-mechanic/index.html"
BASELINE=".mobile-mechanic-baseline.html"

if [ ! -f "$BUILT" ]; then
  echo "GUARDRAIL ERROR: $BUILT not found — run 'npm run build' first." >&2
  exit 1
fi

if [ ! -f "$BASELINE" ]; then
  echo "GUARDRAIL ERROR: $BASELINE not found — capture it before making changes:" >&2
  echo "  cp $BUILT $BASELINE" >&2
  exit 1
fi

# Replace only Vite's 8-character content hashes in asset filenames, e.g.
# /assets/index-cnCfmWPj.js -> /assets/index-HASH.js
normalise() {
  sed -E 's/-[A-Za-z0-9_-]{8}\.(js|css)/-HASH.\1/g' "$1"
}

if diff <(normalise "$BUILT") <(normalise "$BASELINE") > /tmp/mm-guardrail.diff 2>&1; then
  echo "GUARDRAIL PASS: /mobile-mechanic output unchanged (ignoring Vite asset hashes)."
  exit 0
fi

echo "GUARDRAIL FAIL: /mobile-mechanic output changed. Differences:" >&2
cat /tmp/mm-guardrail.diff >&2
exit 1
