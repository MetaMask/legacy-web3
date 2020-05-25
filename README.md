# @metamask/legacy-web3

MetaMask's legacy `window.web3`.

## Motivation

_MetaMask **strongly** recommends that you convert to [another convenience library](https://www.npmjs.com/package/ethers) or to using [our Ethereum Provider API](https://docs.metamask.io/guide/ethereum-provider.html), rather than rely on this module._

On **INSERT_DATE_HERE**, MetaMask will stop injecting `window.web3` into web pages.
**If your dapp relies on MetaMask's `window.web3` to function, it will break on that date unless you take action.**
We first announced our plans to do this on October 31, 2019. Please refer to [the announcement](https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e) if you want to know why.

If you do not wish to take either of the recommended migration paths, we provide this library as a drop-in replacement for our injected `window.web3`.
Simply add it to your site using one of the methods outlined below, and your dapp will continue to work after we stop injecting `window.web3`.
You can add this package before **INSERT_DATE_HERE**, without disrupting the functionality of your dapp.

We make no guarantees about future maintenance of this package, and it probably won't support any new features added to [the MetaMask provider API](https://docs.metamask.io/guide/ethereum-provider.html).

## Usage

Require as a `<script>` in your web page:

```html
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="https://unpkg.com/browse/@metamask/legacy-web3@latest/dist/metamask.web3.min.js" defer></script>
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
