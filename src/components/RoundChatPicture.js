import styled from 'styled-components/macro'

const RoundChatPicture = styled.div(({ size = 100, src }) => ({
  height: size,
  width: size,
  borderRadius: '50%',
  backgroundImage: `url(${src})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundColor: 'rgba(238, 243, 246, 0.8)'
}))

export { RoundChatPicture }
