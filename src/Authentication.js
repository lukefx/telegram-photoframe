import React from 'react'
import styled from 'styled-components'
import QRCodeStyling from 'qr-code-styling'
import logo from './logo.png'

const Container = styled.div({
  display: 'grid',
  placeItems: 'center'
})

export default function Authentication ({ event, client }) {
  const qr = React.useRef()

  React.useEffect(() => {
    async function handleAuhentication () {
      const type = event['authorization_state']['@type']
      switch (type) {
        case 'authorizationStateWaitEncryptionKey':
          await client.current.send({
            '@type': 'checkDatabaseEncryptionKey'
          })
          break
        case 'authorizationStateClosed':
        case 'authorizationStateWaitPhoneNumber':
          await client.current.send({
            '@type': 'requestQrCodeAuthentication',
            other_user_ids: []
          })
          break
        case 'authorizationStateWaitOtherDeviceConfirmation':
          const qrCode = new QRCodeStyling({
            width: 400,
            height: 400,
            data: event.authorization_state.link,
            image: logo,
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

    if (client.current && event?.authorization_state) {
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

// function areEqual (prevProps, nextProps) {
//   return prevProps['type'] === nextProps['type']
// }

// export default React.memo(Authentication, areEqual)
