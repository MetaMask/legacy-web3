require('web3/dist/web3.min.js')

setupWeb3()

/**
 * Inject window.web3 and set up auto reload on chain/network change.
 */
function setupWeb3 () {

  if (window.ethereum === undefined) {
    console.error('@metamask/legacy-web3 - Failed to detect window.ethereum. Exiting without initializing window.web3.')
    return
  }

  // if used before MetaMask stops injecting window.web3
  if (window.ethereum && window.ethereum.isMetaMask && window.web3 !== undefined) {
    console.log('@metamask/legacy-web3 - Detected MetaMask window.ethereum and window.web3. Exiting without initializing window.web3.')
    return
  }

  if (window.web3 !== undefined) {
    console.error('@metamask/legacy-web3 - Detected existing window.web3. Exiting without initializing window.web3.')
    return
  }

  if (window.ethereum && !window.ethereum.isMetaMask) {
    console.warn('@metamask/legacy-web3 - Detected non-MetaMask window.ethereum. Proceeding to initialize window.web3, but may experience undefined behavior.')
  }

  const web3 = new Web3(window.ethereum)
  web3.setProvider = function () {
    console.log('@metamask/legacy-web3 - overrode web3.setProvider')
  }
  console.log('@metamask/legacy-web3 - injected web3')

  window.ethereum._web3Ref = web3.eth

  // export web3 as a global, checking for usage
  let reloadInProgress = false
  let lastTimeUsed
  let previousChainId

  const web3Proxy = new Proxy(web3, {
    get: (_web3, key) => {
      // get the time of use
      lastTimeUsed = Date.now()
      // return value normally
      return _web3[key]
    },
    set: (_web3, key, value) => {
      // set value normally
      _web3[key] = value
    },
  })

  Object.defineProperty(window, 'web3', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: web3Proxy,
  })

  window.ethereum.on('chainChanged', (currentChainId) => {
    // if the auto refresh on network change is false do not
    // do anything
    if (!window.ethereum.autoRefreshOnNetworkChange) {
      return
    }

    // if reload in progress, no need to check reload logic
    if (reloadInProgress) {
      return
    }

    // set the initial chain
    if (!previousChainId) {
      previousChainId = currentChainId
      return
    }

    // skip reload logic if web3 not used
    if (!lastTimeUsed) {
      return
    }

    // if chain did not change, exit
    if (currentChainId === previousChainId) {
      return
    }

    // initiate page reload
    reloadInProgress = true
    const timeSinceUse = Date.now() - lastTimeUsed
    // if web3 was recently used then delay the reloading of the page
    if (timeSinceUse > 500) {
      window.location.reload()
    } else {
      setTimeout(window.location.reload, 500)
    }
  })
}
