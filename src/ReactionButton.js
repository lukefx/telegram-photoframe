import styled from 'styled-components'
import useSound from 'use-sound'
import { useTdlib } from './Tdlib'

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

export default function ReactionButton ({ text, children }) {
  const { chatId, sendTextMessage } = useTdlib()
  const [playActive] = useSound('/pop-down.mp3', { volume: 0.25 })
  const [playOn] = useSound('/pop-up-on.mp3', { volume: 0.25 })

  function sendReaction (text) {
    sendTextMessage(chatId, text)
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
