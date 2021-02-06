import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useTdlib } from './Tdlib'
import RemoteFile from './RemoteFile'
import { RoundChatPicture } from './RoundChatPicture'

const Container = styled.div({
  display: 'grid',
  placeItems: 'center',
  height: '100vh'
})

const Message = styled.div({
  fontSize: '2rem'
})

export default function EmptyChat () {
  const { client, chatId, getChat, getChatHistory } = useTdlib()
  const [title, setTitle] = useState(null)
  const [fileId, setFileId] = useState()

  useEffect(() => {
    if (chatId && getChatHistory) {
      getChatHistory(chatId)
    }
  }, [chatId, getChatHistory])

  useEffect(() => {
    let isSubscribed = true

    async function getChatInfo () {
      const chat = await getChat(chatId)
      const fileId = chat?.photo?.big?.id

      if (isSubscribed) {
        setTitle(chat.title)
        setFileId(fileId)
      }
    }

    getChatInfo()
    return () => (isSubscribed = false)
  }, [client, chatId, getChat])

  return (
    <Container>
      <RemoteFile
        fileId={fileId}
        render={props => <RoundChatPicture size={400} src={props.blob} />}
      />
      <Message>Send a picture to '{title}' to view it here</Message>
    </Container>
  )
}
