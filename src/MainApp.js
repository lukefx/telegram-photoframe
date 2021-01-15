import React from 'react'
import Slideshow from './Slideshow'
import { isEmpty } from 'lodash'
import useLocalStorage from './useLocalStorage'
import ChatSelection from './ChatSelection'
import EmptyChat from './EmptyChat'

export default function MainApp ({ updates, client }) {
  const [chatId, setChatId] = useLocalStorage('chatId')
  const [history, setHistory] = React.useState([])

  React.useEffect(() => {
    async function handleUpdate () {
      // We can have a new message or one could be deleted
      switch (updates['@type']) {
        case 'updateNewMessage':
          if (updates?.message?.chat_id === chatId) {
            setHistory(history => [...history, updates?.message])
          }

          break
        case 'updateDeleteMessages':
          // delete the image from the cache
          if (updates.chat_id === chatId) {
            updates.message_ids.forEach(async messageId => {
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

    if (updates) {
      handleUpdate()
    }
  }, [updates])

  React.useEffect(() => {
    async function fetchHistory () {
      console.log('Fetching chats')
      await client.current.send({
        '@type': 'getChats',
        chat_list: { '@type': 'chatListMain' },
        offset_order: '9223372036854775807',
        offset_chat_id: chatId,
        limit: 1
      })

      console.log('Fetching history for:', chatId)
      const history = await client.current.send({
        '@type': 'getChatHistory',
        chat_id: chatId,
        limit: 1000
      })

      setHistory(history.messages)
    }

    fetchHistory()
  }, [])

  if (!chatId) {
    return <ChatSelection client={client} callback={setChatId} />
  }

  if (isEmpty(history)) {
    return <EmptyChat client={client} chatId={chatId} />
  }

  return <Slideshow client={client} history={history} />
}
