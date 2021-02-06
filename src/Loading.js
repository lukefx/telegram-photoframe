import ReactDOM from 'react-dom'
import styled from 'styled-components/macro'

const Overlay = styled.div({
  display: 'grid',
  placeItems: 'center',
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 999,
  backgroundColor: 'rgba(238, 243, 246, 0.8)',
  overflowX: 'hidden'
})

const Container = styled.div({
  padding: 20,
  display: 'grid',
  placeItems: 'center',
  backgroundColor: 'white',
  boxShadow: '0 0 16px 0 rgba(51,51,51,0.16)',
  height: 150,
  width: 150,
  borderRadius: '50%'
})

export default function Loading ({ message = 'Loading...' }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        <div>{message}</div>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  )
}
