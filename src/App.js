import React from 'react'
import TdClient from 'tdweb'
import Authentication from './Authentication'
import MainApp from './MainApp'

function App () {
  const [event, setEvent] = React.useState()
  const [updates, setUpdates] = React.useState()
  const client = React.useRef()

  React.useEffect(() => {
    console.log('Initializing tdlib')
    client.current = new TdClient({
      useTestDC: false,
      readOnly: false,
      verbosity: 3,
      jsVerbosity: 3,
      fastUpdating: true,
      useDatabase: false,
      mode: 'wasm'
    })
  }, [])

  React.useEffect(() => {
    client.current.onUpdate = update => {
      // console.log('***', JSON.stringify(update))
      // We care only of the auth states here
      if (update && update['@type'] === 'updateAuthorizationState') {
        setEvent(update)
      }

      if (
        update &&
        (update['@type'] === 'updateNewMessage' ||
          update['@type'] === 'updateDeleteMessages')
      ) {
        setUpdates(update)
      }
    }

    client.current.send({
      '@type': 'setTdlibParameters',
      parameters: {
        '@type': 'tdParameters',
        use_test_dc: false,
        api_id: process.env.REACT_APP_APP_ID,
        api_hash: process.env.REACT_APP_HASH_ID,
        system_language_code: navigator.language || 'en',
        device_model: 'Telegram Frame',
        application_version: '0.1',
        use_secret_chats: false,
        use_message_database: false,
        use_file_database: false,
        files_directory: '/'
      }
    })
  }, [client])

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
    return <div>Loading...</div>
  }
}

export default App
