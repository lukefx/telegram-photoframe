import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useTdlib } from './Tdlib'
import RemoteFile from './RemoteFile'
import { RoundChatPicture } from './components/RoundChatPicture'

const ListContainer = styled.div({
  scrollDirection: 'vertical'
})

const List = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const Chat = styled.li({
  padding: 10,
  fontSize: '2rem',
  '&:nth-child(odd)': {
    background: 'rgba(238, 243, 246, 0.8)'
  }
})

export default function ChatSelection () {
  const { client, getChat, getChats, saveChatId } = useTdlib()
  const [chats, setChats] = useState([])

  useEffect(() => {
    async function getChatList () {
      const response = await getChats()
      response.chat_ids.map(async chatId => {
        const chatInfo = await getChat(chatId)
        setChats(chats => [
          ...chats,
          {
            id: chatId,
            title: chatInfo.title,
            chatPhotoId: chatInfo?.photo?.small?.id
          }
        ])
      })
    }

    getChatList()
  }, [client, getChat, getChats])

  return (
    <ListContainer>
      <h1>Select a chat to use as Frame:</h1>
      <List>
        {chats.map(chat => (
          <Chat key={chat.id} onClick={event => saveChatId(chat.id)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <RemoteFile
                fileId={chat.chatPhotoId}
                render={props => (
                  <RoundChatPicture size={100} src={props.blob} />
                )}
              />
              <div style={{ marginLeft: 30 }}>{chat.title}</div>
            </div>
          </Chat>
        ))}
      </List>
    </ListContainer>
  )
}
