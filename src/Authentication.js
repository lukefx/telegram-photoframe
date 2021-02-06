import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useTdlib } from './Tdlib'
import QRCodeStyling from 'qr-code-styling'
import tg_logo from './assets/tg_logo.png'

const Container = styled.div({
  display: 'grid',
  placeItems: 'center',
  height: 600,
  backgroundColor: 'rgba(238, 243, 246, 0.8)'
})

export default function Authentication ({ event }) {
  const { client } = useTdlib()
  const qr = useRef()

  useEffect(() => {
    async function handleAuhentication () {
      const type = event['authorization_state']['@type']
      switch (type) {
        case 'authorizationStateClosed':
          await client.send({ '@type': 'destroy' })
          window.location.reload() // a kind of a 'hack' but it works...
          break
        case 'authorizationStateWaitEncryptionKey':
          await client.send({
            '@type': 'checkDatabaseEncryptionKey'
          })
          break
        case 'authorizationStateWaitPhoneNumber':
          await client.send({
            '@type': 'requestQrCodeAuthentication',
            other_user_ids: []
          })
          break
        case 'authorizationStateWaitOtherDeviceConfirmation':
          const qrCode = new QRCodeStyling({
            width: 400,
            height: 400,
            data: event.authorization_state.link,
            image: tg_logo,
            dotsOptions: {
              color: '#25abec',
              type: 'square'
            },
            backgroundOptions: {
              color: 'transparent'
            },
            imageOptions: {
              crossOrigin: 'anonymous',
              margin: 20
            }
          })

          qr.current.innerHTML = ''
          qrCode.append(qr.current)

          break
        default:
          break
      }
    }

    if (client && event?.authorization_state) {
      handleAuhentication()
    }
  }, [client, event])

  return (
    <Container>
      <h1>Login with your device</h1>
      <div ref={qr}></div>
    </Container>
  )
}
