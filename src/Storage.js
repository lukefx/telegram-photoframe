import React from 'react'
import Dexie from 'dexie'

const StorageContext = React.createContext()

function StorageProvider (props) {
  const [db, setDb] = React.useState()

  React.useEffect(() => {
    console.log('Initialize IndexedDB')
    const db = new Dexie('MessagesDatabase')
    db.version(1).stores({ messages: 'message_id, media_id, received_at' })
    db.open()
    setDb(db)
  }, [])

  return <StorageContext.Provider value={{ db }} {...props} />
}

function useStorage () {
  const context = React.useContext(StorageContext)
  if (context === undefined) {
    throw new Error(`useStorage must be used within a StorageProvider`)
  }
  return context
}

export { StorageProvider, useStorage }
