import React from 'react'
import styled from 'styled-components/macro'
import { useStorage } from './Storage'

const Picture = styled.div(({ blob }) => ({
  width: '100%',
  height: 600,
  backgroundImage: `url(${blob})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

const Reactions = styled.div({
  position: 'relative',
  top: -100,
  left: '85%',
  display: 'flex',
  flexDirection: 'row'
})

const ReactionButton = styled.button({
  padding: 10,
  border: 'none',
  font: 'inherit',
  color: 'inherit',
  backgroundColor: 'light-grey',
  borderRadius: '50%',
  height: 50,
  width: 50,
  fontSize: '1.5rem',
  margin: 5
})

export default function Slideshow ({ client, photoIds }) {
  const { db } = useStorage()
  const [id, setId] = React.useState()
  const [photo, setPhoto] = React.useState([])

  console.log('*** Rendering Slideshow')

  React.useEffect(() => {
    db.messages
      .orderBy('received_at')
      .desc()
      .first()
      .then(message => {
        const src = URL.createObjectURL(message.data)
        setId(message.message_id)
        setPhoto(src)
      })
  }, [])

  React.useEffect(() => {
    async function displayPhoto () {
      const message = await db.messages
        .orderBy('received_at')
        .desc()
        .first()

      const src = URL.createObjectURL(message.data)
      setId(message.message_id)
      setPhoto(src)
    }

    if (photoIds) {
      displayPhoto()
    }
  }, [photoIds])

  function sendReaction (event, emoji) {
    client.current.send({
      '@type': 'sendMessage',
      chat_id: -440888561,
      reply_to_message_id: 0,
      input_message_content: {
        '@type': 'inputMessageText',
        text: {
          '@type': 'formattedText',
          text: emoji,
          entities: []
        }
      }
    })
  }

  return (
    <React.Fragment>
      <Picture data-testis={id} blob={photo} onto />
      <Reactions>
        <ReactionButton onClick={event => sendReaction(event, '♥️')}>
          ♥️
        </ReactionButton>
        <ReactionButton onClick={event => sendReaction(event, '🥰')}>
          🥰
        </ReactionButton>
      </Reactions>
    </React.Fragment>
  )
}
