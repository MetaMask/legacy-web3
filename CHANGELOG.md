# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2021-01-15

### Changed

- **(SEMVER-MAJOR)** Rename and completely un-minify main entry point file ([#24](https://github.com/MetaMask/legacy-web3/pull/24))
  - Main entry point renamed from `index.js` to `metamask.web3.js`.
  - Consumers importing this package as a module should be unaffected.

## [1.2.0] - 2020-11-25

### Fixed

- **(IMPORTANT)** Fixed `window.web3` overwrite behavior ([#21](https://github.com/MetaMask/legacy-web3/pull/21))
  - While MetaMask will stop injecting `web3`, it will continue to inject a shim at `window.web3` to preserve the `web3.currentProvider` property.
  To accomplish this, the overwrite behavior had to be updated.
  Previous version of this package will not work and are deprecated.
- Importing in Node.js ([#22](https://github.com/MetaMask/legacy-web3/pull/22))
  - In a previous version, we inadvertently stopped building a CommonJS-compatible file. There's now a `dist/index.js` specified as the main entry point in UMD format.

### Changed

- Set `web3.eth.defaultAccount` on initialization if possible ([#20](https://github.com/MetaMask/legacy-web3/pull/20))

## [1.1.0] - DEPRECATED

## [1.0.2] - DEPRECATED

## [1.0.1] - DEPRECATED

## [1.0.0] - DEPRECATED

[Unreleased]:https://github.com/MetaMask/legacy-web3/compare/v2.0.0...HEAD
[2.0.0]:https://github.com/MetaMask/legacy-web3/compare/v1.2.0...v2.0.0
[1.2.0]:https://github.com/MetaMask/legacy-web3/compare/v1.1.0...v1.2.0
[1.1.0]:https://github.com/MetaMask/legacy-web3/compare/v1.0.2...v1.1.0
[1.0.2]:https://github.com/MetaMask/legacy-web3/compare/v1.0.1...v1.0.2
[1.0.1]:https://github.com/MetaMask/legacy-web3/compare/v1.0.0...v1.0.1
