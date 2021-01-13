import React from 'react'
import { last } from 'lodash'
import Slideshow from './Slideshow'
import { useStorage } from './Storage'

export default function MainApp ({ updates, client }) {
  const { messagesStorage, mediaStorage } = useStorage()
  const [photoIds, setPhotoIds] = React.useState()

  const chatId = -440888561

  React.useEffect(() => {
    async function handleUpdate () {
      // We can have a new message or one could be deleted
      switch (updates['@type']) {
        case 'updateNewMessage':
          // download new image, save and cache it
          if (updates?.message?.chat_id === chatId) {
            const photoSize = last(updates.message.content.photo.sizes)
            const photoId = photoSize.photo.id
            const picture = await mediaStorage.getItem(String(photoId))

            // picture is not cached already
            if (!picture) {
              // downloading the file
              await client.current.send({
                '@type': 'downloadFile',
                file_id: photoId,
                priority: 16,
                synchronous: true
              })

              // Read the data from local tdlib to blob
              const localFile = await client.current.send({
                '@type': 'readFile',
                file_id: photoId
              })

              await messagesStorage.setItem(
                String(updates?.message.id),
                photoId
              )
              await mediaStorage.setItem(String(photoId), localFile.data)
              setPhotoIds(await mediaStorage.keys())
            }
          }

          break
        case 'updateDeleteMessages':
          // delete the image from the cache
          if (updates.chat_id === chatId) {
            updates.message_ids.forEach(async messageId => {
              const photoId = await messagesStorage.getItem(String(messageId))
              if (await mediaStorage.getItem(String(photoId))) {
                await messagesStorage.removeItem(String(messageId))
                await mediaStorage.removeItem(String(photoId))
                setPhotoIds(await mediaStorage.keys())
              }
            })
          }

          break
        default:
          break
      }
    }

    if (updates) {
      handleUpdate()
    }
  }, [updates])

  React.useEffect(() => {
    async function fetchHistory () {
      await client.current.send({
        '@type': 'getChats',
        chat_list: { '@type': 'chatListMain' },
        offset_order: '9223372036854775807',
        offset_chat_id: chatId,
        limit: 1
      })

      await client.current.send({
        '@type': 'getChatHistory',
        chat_id: chatId,
        limit: 1000
      })

      const search = await client.current.send({
        '@type': 'searchChatMessages',
        chat_id: chatId,
        query: '',
        sender_user_id: 0,
        from_message_id: 0,
        offset: 0,
        limit: 1000,
        filter: {
          '@type': 'searchMessagesFilterPhotoAndVideo'
        }
      })

      search?.messages.forEach(async message => {
        const biggestPhoto = last(message.content.photo.sizes)
        const photoId = biggestPhoto.photo.id
        const picture = await mediaStorage.getItem(String(photoId))

        // picture is not cached already
        if (!picture) {
          // downloading the file
          await client.current.send({
            '@type': 'downloadFile',
            file_id: photoId,
            priority: 16,
            synchronous: true
          })

          // Read the data from local tdlib to blob
          const localFile = await client.current.send({
            '@type': 'readFile',
            file_id: photoId
          })

          await messagesStorage.setItem(String(message.id), String(photoId))
          await mediaStorage.setItem(String(photoId), localFile.data)
          setPhotoIds(await mediaStorage.keys())
        }
      })
    }

    fetchHistory()
  }, [])

  return <Slideshow photoIds={photoIds} />
}
