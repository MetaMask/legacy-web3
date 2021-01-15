# @metamask/legacy-web3

MetaMask's legacy `window.web3`.

## Motivation

_MetaMask **strongly** recommends that you [read our migration guide](https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3) before using this package._
_You should only rely on this package if you need a temporary fix or are no longer actively developing your web3 site._

In the near future, MetaMask will stop injecting `window.web3` into web pages.
**When we do this, if your website relies on MetaMask's `window.web3` to function, it will break on that date unless you take action.**
Please refer to [the original announcement](https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e) if you want to know why we're doing this.

If you do not wish to take either of the recommended migration paths, we provide this library as a drop-in replacement for our injected `window.web3`.
Simply add it to your site using one of the methods outlined below, and your Ethereum functionality will continue to work after we stop injecting `window.web3`.

You can add this package before we stop injecting `window.web3`, without disrupting the Ethereum functionality of your website.

## Disclaimer

This package is designed to emulate the functionality of our injected `window.web3`.
That said, we do not guarantee complete functional parity, and you may have to fix some bugs yourself.
We also make no guarantees about future maintenance of this package, and it is unlikely to support any new features added to [the MetaMask provider API](https://docs.metamask.io/guide/ethereum-provider.html).

## Usage

As a `<script>` in your web page:

```html
<html>
  <head>
    <!-- The legacy-web3 script must run BEFORE your other scripts. -->
    <script src="https://unpkg.com/@metamask/legacy-web3@latest/dist/metamask.web3.min.js"></script>
    <!-- Or: -->
    <script src="https://unpkg.com/@metamask/legacy-web3@latest/dist/metamask.web3.js"></script>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

Or add as a Node dependency:

```shell
yarn add @metamask/legacy-web3

# or

npm install @metamask/legacy-web3
```

```javascript
import '@metamask/legacy-web3'

// or

require('@metamask/legacy-web3')

const { web3 } = window
const selectedAddress = web3.eth.defaultAccount
```

### Initialization Criteria

This package will only initialize `window.web3` under the following circumstances:

- It detects an existing `window.ethereum`
- It does **not** detect an existing `window.web3`

`window.ethereum.isMetaMask` can be `true` or falsy.
If it is falsy and there is no existing `window.web3`, this package will initialize its `window.web3`, but there are no guarantees that it will work with non-MetaMask providers.
