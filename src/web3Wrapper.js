require('web3/dist/web3.min.js')
const detectEthereumProvider = require('@metamask/detect-provider')

const getMessage = (message) => `@metamask/legacy-web3 - ${message}`
const getExitMessage = (message) => `${getMessage(message)} Exiting without initializing window.web3.`

setupWeb3()

/**
 * Inject window.web3 and set up auto reload on chain/network change.
 */
function setupWeb3 () {

  if (window.ethereum) {
    _setupWeb3()
  } else {
    detectEthereumProvider({ silent: true })
      .then((_provider) => {
        if (window.ethereum) {
          _setupWeb3()
        } else {
          console.log(getExitMessage('Failed to detect window.ethereum.'))
        }
      })
      .catch((error) => {
        console.error(
          getExitMessage('Unexpected error when detecting window.ethereum.'),
          error,
        )
      })
  }

  function _setupWeb3 () {

    // if used before MetaMask stops injecting window.web3
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      window.web3 &&
      !window.web3.__isMetaMaskShim__
    ) {
      console.log(getExitMessage('Detected MetaMask-injected window.web3.'))
      return
    }

    // MetaMask will continue to inject a web3 Proxy, with this hidden
    // identifier
    if (window.web3 && !window.web3.__isMetaMaskShim__) {
      console.log(getExitMessage('Detected existing window.web3.'))
      return
    }

    if (window.ethereum && !window.ethereum.isMetaMask) {
      console.warn(getMessage(
        'Detected non-MetaMask window.ethereum. ' +
        'Proceeding to initialize window.web3, but may experience undefined behavior.',
      ))
    }

    if (!('autoRefreshOnNetworkChange' in window.ethereum)) {
      window.ethereum.autoRefreshOnNetworkChange = true
    }

    const web3 = new Web3(window.ethereum)
    web3.setProvider = function () {
      console.log(getMessage('Overrode web3.setProvider.'))
    }
    console.log(getMessage('Injected web3.'))

    const handleAccounts = (accounts) => {
      web3.eth.defaultAccount = Array.isArray(accounts) && accounts.length > 0
        ? accounts[0]
        : null
    }

    if (window.ethereum.selectedAddress) {
      web3.eth.defaultAccount = window.ethereum.selectedAddress
    } else {
      const req = { method: 'eth_accounts' }

      if (typeof window.ethereum.request === 'function') {
        window.ethereum.request(req)
          .then(handleAccounts)
          .catch(() => undefined)
      } else {
        window.ethereum.sendAsync(req, (error, response) => {
          if (!error && response) {
            handleAccounts(response.result)
          }
        })
      }
    }
    window.ethereum.on('accountsChanged', handleAccounts)

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
}
