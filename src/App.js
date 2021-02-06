import React from 'react'
import { useTdlib } from './Tdlib'
import Authentication from './Authentication'
import MainApp from './MainApp'

import '@fontsource/roboto'
import './App.css'
import Loading from './Loading'

function App () {
  const { client, event, updates } = useTdlib()

  if (event && event['authorization_state']) {
    const type = event['authorization_state']['@type']
    switch (type) {
      case 'authorizationStateWaitEncryptionKey':
      case 'authorizationStateWaitOtherDeviceConfirmation':
      case 'authorizationStateWaitPhoneNumber':
      case 'updateAuthorizationState':
      case 'authorizationStateClosed':
        return <Authentication event={event} client={client} />
      case 'authorizationStateReady':
        return <MainApp updates={updates} client={client} />
      default:
        return null
    }
  } else {
    return <Loading message='Loading the app...' />
  }
}

export default App
