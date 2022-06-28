import {UAuthMoralisConnector} from '@uauth/moralis'

export const injected = {}
export const walletconnect = {provider: 'walletconnect'}

UAuthMoralisConnector.setUAuthOptions({
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,

  scope: 'openid wallet',
  connectors: {injected, walletconnect},
});

export const uauth = {connector: UAuthMoralisConnector};

const connectors = {
  injected,
  walletconnect,
  uauth,
}

export default connectors