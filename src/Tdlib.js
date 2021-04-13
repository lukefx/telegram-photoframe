import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  createContext
} from 'react'
import TdClient from 'tdweb'

const TelegramContext = createContext()

function TelegramProvider (props) {
  const [client, setClient] = useState()
  const [chatId, setChatId] = useState()
  // we need to keep a pointer to chatId since is used in the tdlib callback
  const chatIdRef = useRef()
  const [event, setEvent] = useState()
  const [history, setHistory] = useState([])

  /**
   * We need to count how many times we called getChatHistory
   * On the first call it can returns just 1 message
   * */

  const [historyCalls, setHistoryCalls] = useState(0)

  const sendTextMessage = async (chatId, text) => {
    return client.send({
      '@type': 'sendMessage',
      chat_id: chatId,
      reply_to_message_id: 0,
      input_message_content: {
        '@type': 'inputMessageText',
        text: {
          '@type': 'formattedText',
          text,
          entities: []
        }
      }
    })
  }

  const getChats = async (
    offset_order = '9223372036854775807',
    offset_chat_id = 0,
    limit = 20
  ) => {
    console.log('getChats')
    return client.send({
      '@type': 'getChats',
      chat_list: { '@type': 'chatListMain' },
      offset_order,
      offset_chat_id,
      limit
    })
  }

  const getChat = async chatId => {
    console.log('getChat', chatId)
    return client.send({
      '@type': 'getChat',
      chat_id: chatId
    })
  }

  const downloadFile = async fileId => {
    console.log('Download file', fileId)
    // downloading the file
    await client.send({
      '@type': 'downloadFile',
      file_id: fileId,
      priority: 1,
      synchronous: true
    })

    // Read the data from local tdlib to blob
    return client.send({
      '@type': 'readFile',
      file_id: fileId
    })
  }

  const getChatHistory = useCallback(
    async (chatId, from_message_id = 0, limit = 100) => {
      console.log('getChatHistory', chatId, from_message_id)
      if (client) {
        setHistoryCalls(calls => calls + 1)
        const newHistory = await client.send({
          '@type': 'getChatHistory',
          chat_id: chatId,
          limit,
          from_message_id
        })

        setHistory(history =>
          [...new Set([...newHistory.messages, ...history])].sort(
            (a, b) => a.date - b.date
          )
        )
      }
    },
    [client]
  )

  useEffect(() => {
    // We don't have to run this effect if chat is not selected
    if (!chatId) {
      return
    }

    if (history.length === 1 && historyCalls === 1) {
      console.log('Refreshing history...')
      const from_id = history[0].id
      getChatHistory(chatId, from_id)
    }
  }, [chatId, history, getChatHistory, historyCalls])

  const handleMessages = update => {
    console.log(update)
    // We can have a new message or one could be deleted
    switch (update['@type']) {
      case 'updateNewMessage':
        if (update?.message?.chat_id === chatIdRef.current) {
          setHistory(history => [...history, update?.message])
        }
        break
      case 'updateDeleteMessages':
        // delete the image from the cache
        if (update.chat_id === chatIdRef.current) {
          update.message_ids.forEach(async messageId => {
            setHistory(history =>
              history.filter(message => message.id !== messageId)
            )
          })
        }
        break
      default:
        break
    }
  }

  const onUpdate = useCallback(update => {
    // This is for debug, the amount of messages from the lib scares me...
    // console.log('***', JSON.stringify(update))
    // We care only of the auth states here
    if (update['@type'] === 'updateAuthorizationState') {
      setEvent(update)
    }

    if (
      update['@type'] === 'updateNewMessage' ||
      update['@type'] === 'updateDeleteMessages'
    ) {
      handleMessages(update)
    }
  }, [])

  useEffect(() => {
    console.log('Initializing tdlib')
    const tdlib = new TdClient({
      useTestDC: false,
      readOnly: false,
      verbosity: 3,
      jsVerbosity: 3,
      fastUpdating: true,
      useDatabase: false,
      mode: 'wasm'
    })

    tdlib.onUpdate = onUpdate
    setClient(tdlib)
  }, [onUpdate])

  useEffect(() => {
    if (client) {
      console.log('setTdlibParameters')
      client.send({
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
          use_message_database: true,
          use_file_database: true,
          files_directory: '/'
        }
      })
    }
  }, [client])

  const saveChatId = chatId => {
    chatIdRef.current = chatId
    setChatId(chatId)
  }

  console.log('Current history:', history)

  return (
    <TelegramContext.Provider
      value={{
        client,
        chatId,
        saveChatId,
        event,
        history,
        getChat,
        getChats,
        getChatHistory,
        sendTextMessage,
        downloadFile
      }}
      {...props}
    />
  )
}

function useTdlib () {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error(`useTdlib must be used within a TelegramProvider`)
  }
  return context
}

export { TelegramProvider, useTdlib }
