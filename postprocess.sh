#!/usr/bin/env bash

set -u
set -o pipefail

function abort {
  local message="${1}"

  printf "ERROR: %s\\n" "${message}" >&2

  exit 1
}

function main() {

  local BUNDLE_FILE_PATH="dist/bundle.js"
  local FIND="^!function(){\"use strict\";"
  local REPLACE="!function(){\"use strict\";var require;"

  echo "postprocess: inserting missing 'var require;'"

  sed -i "" -e "s#${FIND}#${REPLACE}#" "${BUNDLE_FILE_PATH}" || abort "sed failed"

  echo "postprocess: success!"
}

main
