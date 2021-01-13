import React from 'react'

export default function ChatSelection ({ event, client }) {
  const [chats, setChats] = React.useState([])

  React.useEffect(() => {
    async function getChats () {
      const response = await client.current.send({
        '@type': 'getChats',
        chat_list: { '@type': 'chatListMain' },
        offset_order: '9223372036854775807',
        offset_chat_id: 0,
        limit: 10
      })

      response.chat_ids.map(async chatId => {
        const chatInfo = await client.current.send({
          '@type': 'getChat',
          chat_id: chatId
        })
        setChats(chats => [...chats, { id: chatId, title: chatInfo.title }])
      })
    }

    getChats()
  }, [])

  return (
    <div>
      <h1>Main app window</h1>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>{chat.title}</li>
        ))}
      </ul>
    </div>
  )
}
