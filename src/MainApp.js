import React from 'react'
import { last } from 'lodash'
import Slideshow from './Slideshow'
import { useStorage } from './Storage'

export default function MainApp ({ updates, client }) {
  const { db } = useStorage()
  const [photoIds, setPhotoIds] = React.useState()

  const chatId = -440888561

  React.useEffect(() => {
    async function handleUpdate () {
      // We can have a new message or one could be deleted
      switch (updates['@type']) {
        case 'updateNewMessage':
          if (updates?.message?.content?.['@type'] !== 'messagePhoto') {
            return
          }

          // download new image, save and cache it
          if (updates?.message?.chat_id === chatId) {
            const photoSize = last(updates.message.content.photo.sizes)
            const photoId = photoSize.photo.id
            const picture = await db.messages
              .where('media_id')
              .equals(photoId)
              .first()

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

              await db.messages.add({
                message_id: String(updates?.message.id),
                media_id: String(photoId),
                data: localFile.data
              })

              await db.messages.put({
                message_id: String(updates?.message.id),
                media_id: String(photoId),
                received_at: updates?.message.date,
                data: localFile.data
              })

              setPhotoIds(await db.messages.orderBy('received_at').toArray())
            }
          }

          break
        case 'updateDeleteMessages':
          // delete the image from the cache
          if (updates.chat_id === chatId) {
            updates.message_ids.forEach(async messageId => {
              await db.messages
                .where('message_id')
                .equals(String(messageId))
                .delete()
              setPhotoIds(await db.messages.orderBy('received_at').toArray())
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
      console.log('Fetching history for:', chatId)
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

        const storedMessage = await db.messages
          .where('message_id')
          .equals(String(message.id))
          .first()

        // picture is not cached already
        if (!storedMessage) {
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

          await db.messages.put({
            message_id: String(message.id),
            media_id: String(photoId),
            received_at: message.date,
            data: localFile.data
          })

          setPhotoIds(await db.messages.orderBy('received_at').toArray())
        }
      })
    }

    fetchHistory()
  }, [])

  return <Slideshow client={client} photoIds={photoIds} />
}
