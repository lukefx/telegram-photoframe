import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div({
  display: 'grid',
  placeItems: 'center',
  height: '100vh'
})

const ChatPicture = styled.div(({ src }) => ({
  height: 400,
  width: 400,
  borderRadius: '50%',
  backgroundImage: `url(${src})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

const Message = styled.div({
  fontSize: '2rem'
})

export default function EmptyChat ({ client, chatId }) {
  const [title, setTitle] = React.useState(null)
  const [chatPhoto, setChatPhoto] = React.useState(null)

  React.useEffect(() => {
    async function getChat () {
      await client.current.send({
        '@type': 'getChats',
        chat_list: { '@type': 'chatListMain' },
        offset_order: '9223372036854775807',
        offset_chat_id: chatId,
        limit: 1
      })

      const chat = await client.current.send({
        '@type': 'getChat',
        chat_id: chatId
      })

      const fileId = chat.photo.big.id

      // downloading the file
      await client.current.send({
        '@type': 'downloadFile',
        file_id: fileId,
        priority: 1,
        synchronous: true
      })

      // Read the data from local tdlib to blob
      const localFile = await client.current.send({
        '@type': 'readFile',
        file_id: fileId
      })

      const src = URL.createObjectURL(localFile.data)

      setChatPhoto(src)
      setTitle(chat.title)
    }

    getChat()
  }, [client, chatId])

  return (
    <Container>
      <ChatPicture src={chatPhoto} />
      <Message>Send a picture to '{title}' to view it here</Message>
    </Container>
  )
}
