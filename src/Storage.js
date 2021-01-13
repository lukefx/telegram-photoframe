import React from 'react'
import localforage from 'localforage'

const StorageContext = React.createContext()

function StorageProvider (props) {
  const [messagesStorage, setMessagesStorage] = React.useState()
  const [mediaStorage, setMediaStorage] = React.useState()

  React.useEffect(() => {
    console.log('Initialize IndexedDB')

    const messages = localforage.createInstance({
      name: 'messages'
    })

    const media = localforage.createInstance({
      name: 'media'
    })

    setMessagesStorage(messages)
    setMediaStorage(media)
  }, [])

  return (
    <StorageContext.Provider
      value={{ messagesStorage, mediaStorage }}
      {...props}
    />
  )
}

function useStorage () {
  const context = React.useContext(StorageContext)
  if (context === undefined) {
    throw new Error(`useStorage must be used within a StorageProvider`)
  }
  return context
}

export { StorageProvider, useStorage }
