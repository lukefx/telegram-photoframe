import React from 'react'
import styled from 'styled-components/macro'
import { last } from 'lodash'
import ReactionButton from './ReactionButton'

const Picture = styled.div(({ blob }) => ({
  width: '100%',
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
  top: -120,
  left: '85%',
  display: 'flex',
  flexDirection: 'row'
})

export default function Slideshow ({ client, history }) {
  const [id, setId] = React.useState()
  const [photo, setPhoto] = React.useState([])
  const [caption, setCaption] = React.useState('')

  React.useEffect(() => {
    async function getLastMessage () {
      // Getting last message
      const message = last(history)

      if (message?.content?.['@type'] === 'messagePhoto') {
        const { caption, photo } = message.content
        const photoSize = last(photo.sizes)
        const fileId = photoSize.photo.id

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

        setId(fileId)
        setPhoto(src) // photo blob
        setCaption(caption?.text)
      }
    }

    if (history) {
      getLastMessage()
    }
  }, [history])

  return (
    <React.Fragment>
      <Picture data-testis={id} blob={photo} />
      <Caption>{caption}</Caption>
      <Reactions>
        <ReactionButton client={client} text='♥️'>
          ♥️
        </ReactionButton>
        <ReactionButton client={client} text='🥰'>
          🥰
        </ReactionButton>
      </Reactions>
    </React.Fragment>
  )
}
