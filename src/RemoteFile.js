import { useState, useEffect } from 'react'
import { useTdlib } from './Tdlib'

export default function RemoteFile ({ fileId, render }) {
  const { downloadFile } = useTdlib()
  const [blob, setBlob] = useState()

  useEffect(() => {
    let isSubscribed = true
    async function getRemoteFile () {
      if (!fileId) {
        return
      }
      const file = await downloadFile(fileId)
      if (isSubscribed) {
        setBlob(URL.createObjectURL(file.data))
      }
    }

    getRemoteFile()
    return () => (isSubscribed = false)
  }, [fileId, downloadFile])

  return render && render({ blob })
}
