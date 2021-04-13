import styled from 'styled-components/macro'
import RemoteFile from '../RemoteFile'

const PhotoContainer = styled.div(({ blob }) => ({
  // width: '100%',
  height: 600,
  backgroundImage: `url(${blob})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

export default function Photo ({ fileId }) {
  return (
    <RemoteFile
      fileId={fileId}
      render={props => <PhotoContainer blob={props.blob} />}
    />
  )
}
