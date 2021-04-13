import RemoteFile from '../RemoteFile'

export default function Video ({ fileId }) {
  return (
    <RemoteFile
      fileId={fileId}
      render={props => <video src={props.blob} controls autoPlay />}
    />
  )
}
