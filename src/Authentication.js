import React from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode'

const Container = styled.div({
  display: 'grid',
  placeItems: 'center'
})

function Authentication ({ type, event, client }) {
  const qr = React.useRef()

  React.useEffect(() => {
    async function handleAuhentication () {
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
          QRCode.toCanvas(qr.current, event.authorization_state.link)
          break
        default:
          break
      }
    }

    if (client.current) {
      handleAuhentication()
    }
  }, [client, type])

  return (
    <Container>
      <h1>Login with your device</h1>
      <canvas ref={qr}></canvas>
    </Container>
  )
}

function areEqual (prevProps, nextProps) {
  return prevProps['type'] === nextProps['type']
}

export default React.memo(Authentication, areEqual)
