#!/bin/sh

OLD_PWD="$PWD"
REPO_ROOT=`git rev-parse --show-toplevel`
OUT_PATH="dist/kobo-add-all.zip"

cd "$REPO_ROOT"

rm "$OUT_PATH"
zip -r "$OUT_PATH" . -x ".git*" "pack.sh" "dist*" "README.md"

cd "$OLD_PWD"
