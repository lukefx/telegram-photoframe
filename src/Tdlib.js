import React from 'react'
import TdClient from 'tdweb'

const TelegramContext = React.createContext()

function TelegramProvider (props) {
  // const [tdlib, setTdlib] = React.useState()
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

  return <TelegramContext.Provider value={{ client }} {...props} />
}

function useTdlib () {
  const context = React.useContext(TelegramContext)
  if (context === undefined) {
    throw new Error(`useTdlib must be used within a TelegramProvider`)
  }
  return context
}

export { TelegramProvider, useTdlib }
