# @metamask/legacy-web3

MetaMask's legacy `window.web3`.

## Motivation

_MetaMask **strongly** recommends that you convert to [another convenience library](https://www.npmjs.com/package/ethers) or to using [our Ethereum Provider API](https://docs.metamask.io/guide/ethereum-provider.html), rather than rely on this module._

In the near future, MetaMask will stop injecting `window.web3` into web pages.
**When we do this, if your dapp relies on MetaMask's `window.web3` to function, it will break on that date unless you take action.**
Please refer to [the original announcement](https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e) if you want to know why we're doing this.

If you do not wish to take either of the recommended migration paths, we provide this library as a drop-in replacement for our injected `window.web3`.
Simply add it to your site using one of the methods outlined below, and your dapp will continue to work after we stop injecting `window.web3`.
You can add this package before we stop injecting `window.web3`, without disrupting the functionality of your dapp.

## Disclaimer

This package is designed to emulate the functionality of our injected `window.web3`.
That said, we do not guarantee complete functional parity, and you may have to fix some bugs yourself.
We also make no guarantees about future maintenance of this package, and it is unlikely to support any new features added to [the MetaMask provider API](https://docs.metamask.io/guide/ethereum-provider.html).

## Usage

As a `<script>` in your web page:

```html
<html>
  <head>
    <!--
      The legacy-web3 script must run BEFORE your scripts.
      The order of other external scripts may or may not matter.
      We recommend using "defer" for your scripts and the legacy-web3 script.
    -->
    <script defer src="https://unpkg.com/browse/@metamask/legacy-web3@latest/dist/metamask.web3.min.js"></script>
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
import '@metamask/legacy-web3`

// or

require('@metamask/legacy-web3')

const { web3 } = window
const selectedAddress = web3.eth.accounts
```
