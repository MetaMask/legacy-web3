#!/usr/bin/env bash

set -u
set -o pipefail

function abort {
  local message="${1}"

  printf "ERROR: %s\\n" "${message}" >&2

  exit 1
}

function main() {

  local BUNDLE_FILE_PATH="dist/metamask.web3.min.js"
  local FIND="^!function(){\"use strict\";"
  local REPLACE="!function(){\"use strict\";var require;"

  echo "postprocess: inserting missing 'var require;'"

  # web3.min.js includes implicit "require" statements, and we have to declare
  # the variable to get our bundle to run in the browser.
  # Rollup can't handle it
  sed -i -e "s#${FIND}#${REPLACE}#" "${BUNDLE_FILE_PATH}" || abort "sed failed"

  echo "postprocess: success!"
}

main
