import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useTdlib } from './Tdlib'
import { last, isEmpty } from 'lodash'
import Loading from './Loading'
import ReactionButton from './ReactionButton'

const Container = styled.div({
  overflow: 'hidden',
  height: 600,
  width: 1024,
  cursor: 'none'
})

const Picture = styled.div(({ blob }) => ({
  // width: '100%',
  height: 600,
  backgroundImage: `url(${blob})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

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
  const { client, chatId, history, getChatHistory, downloadFile } = useTdlib()
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState()
  const [caption, setCaption] = useState('')

  useEffect(() => {
    async function getMediaMessage () {
      setLoading(true)
      // Getting last message with a Photo/Video
      const mediaMessages = history.filter(message =>
        ['messagePhoto', 'messageVideo'].includes(message?.content?.['@type'])
      )

      if (isEmpty(mediaMessages)) {
        // we don't have any media in the chat...
        setMedia(<Loading message='No media in this chat...' />)
      }

      const message = last(mediaMessages)
      switch (message?.content?.['@type']) {
        case 'messagePhoto':
          const photo = message.content.photo
          const photoSize = last(photo.sizes)
          const photoFileId = photoSize.photo.id
          const localPhotoFile = await downloadFile(photoFileId)
          const photoSrc = URL.createObjectURL(localPhotoFile.data)
          setMedia(<Picture data-testid={photoFileId} blob={photoSrc} />)
          setCaption(message.content?.text)
          break
        case 'messageVideo':
          const video = message.content.video
          const videoId = video.video.id
          const localVideoFile = await downloadFile(videoId)
          const videoSrc = URL.createObjectURL(localVideoFile.data)
          setMedia(
            <video data-testid={videoId} src={videoSrc} controls autoPlay />
          )
          setCaption(message.content?.text)
          break
        default:
          break
      }
      setLoading(false)
    }

    getMediaMessage()
  }, [client, history, chatId, getChatHistory, downloadFile])

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
