import React from 'react'
import styled from 'styled-components/macro'
import { last } from 'lodash'
import { useStorage } from './Storage'

const Picture = styled.div(({ blob }) => ({
  width: 1024,
  height: '100%',
  backgroundImage: `url(${blob})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  // backgroundSize: '80%'
  backgroundSize: 'cover'
}))

export default function Slideshow ({ photoIds }) {
  const { mediaStorage } = useStorage()
  const [id, setId] = React.useState()
  const [photo, setPhoto] = React.useState([])

  React.useEffect(() => {
    async function displayPhoto () {
      const id = last(photoIds)
      const blob = await mediaStorage.getItem(id)
      const src = URL.createObjectURL(blob)
      setId(id)
      setPhoto(src)
    }

    if (photoIds) {
      displayPhoto()
    }
  }, [photoIds])

  return (
    <React.Fragment>
      <Picture data-testis={id} blob={photo} />
      {/* <img data-testis={id} src={photo} alt='Latest' /> */}
    </React.Fragment>
  )
}
