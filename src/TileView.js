import { useState, useEffect } from 'react'
import { useTdlib } from './Tdlib'

export default function TileView () {
  const { history } = useTdlib()
  const [media, setMedia] = useState([])

  useEffect(() => {
    const mediaMessages = history.filter(message =>
      ['messagePhoto', 'messageVideo'].includes(message?.content?.['@type'])
    )

    setMedia(mediaMessages)
  }, [history])

  return
}
