import React from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'

const Button = styled.button({
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

export default function ReactionButton ({ client, text, children }) {
  const [playActive] = useSound('/pop-down.mp3', { volume: 0.25 })
  const [playOn] = useSound('/pop-up-on.mp3', { volume: 0.25 })

  function sendReaction (text) {
    client.current.send({
      '@type': 'sendMessage',
      chat_id: -440888561,
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

  function onClick (event) {
    playOn()
    sendReaction(text)
  }

  return (
    <Button onMouseDown={playActive} onMouseUp={onClick}>
      {children}
    </Button>
  )
}
