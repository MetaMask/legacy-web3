# @metamask/legacy-web3

_MetaMask **strongly** recommends that you convert to [another convenience library](https://www.npmjs.com/package/ethers) or to using [our Ethereum Provider API](https://docs.metamask.io/guide/ethereum-provider.html), rather than rely on this module._

MetaMask's legacy `window.web3`.

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
