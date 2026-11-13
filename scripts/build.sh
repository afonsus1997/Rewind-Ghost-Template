#!/usr/bin/env bash
# Build dist/rewind.zip from the theme/ folder.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/dist"
rm -f "$ROOT/dist/rewind.zip"

cd "$ROOT/theme"
zip -rq "$ROOT/dist/rewind.zip" . -x '.*' -x 'node_modules/*' -x '*.zip'

# Keep a ready-to-upload copy at the repo root
cp "$ROOT/dist/rewind.zip" "$ROOT/rewind.zip"

VERSION="$(node -p "require('./package.json').version" 2>/dev/null || echo unknown)"
echo "Built dist/rewind.zip and rewind.zip (Rewind v$VERSION)"
