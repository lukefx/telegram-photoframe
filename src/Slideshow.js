import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { last, isEmpty } from 'lodash'
import { useTdlib } from './Tdlib'
import Loading from './Loading'
import ReactionButton from './ReactionButton'
import Photo from './components/Photo'
import Video from './components/Video'
import { getMediaMessages } from './utility'

const Container = styled.div({
  overflow: 'hidden',
  height: 600,
  width: 1024,
  cursor: 'none'
})

const Caption = styled.div({
  position: 'relative',
  top: -60,
  left: '2%',
  color: 'white',
  fontSize: '2rem'
})

const Reactions = styled.div({
  position: 'relative',
  top: '-15%',
  left: '85%',
  display: 'flex',
  flexDirection: 'row'
})

export default function Slideshow () {
  console.log('Rendering Slideshow')
  const { client, chatId, history } = useTdlib()
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState()
  const [caption, setCaption] = useState('')

  useEffect(() => {
    async function getMediaMessage () {
      setLoading(true)
      // Getting last message with a Photo/Video
      const mediaMessages = getMediaMessages(history)

      if (isEmpty(mediaMessages)) {
        // we don't have any media in the chat...
        setMedia(<Loading message='No media in this chat...' />)
      }

      const message = last(mediaMessages)
      switch (message?.content?.['@type']) {
        case 'messagePhoto':
          const photo = message.content.photo
          const photoSize = last(photo.sizes)
          setMedia(<Photo fileId={photoSize.photo.id} />)
          setCaption(message.content?.text)
          break
        case 'messageVideo':
          const video = message.content.video
          setMedia(<Video fileId={video.video.id} />)
          setCaption(message.content?.text)
          break
        default:
          break
      }
      setLoading(false)
    }

    getMediaMessage()
  }, [client, history, chatId])

  return (
    <Container>
      {loading && <Loading />}
      {media}
      <Caption>{caption}</Caption>
      <Reactions>
        <ReactionButton client={client} text='♥️'>
          ♥️
        </ReactionButton>
        <ReactionButton client={client} text='🥰'>
          🥰
        </ReactionButton>
      </Reactions>
    </Container>
  )
}
