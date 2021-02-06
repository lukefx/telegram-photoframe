import { isEmpty } from 'lodash'
import { useTdlib } from './Tdlib'
import ChatSelection from './ChatSelection'
import EmptyChat from './EmptyChat'
import Slideshow from './Slideshow'

export default function MainApp () {
  const { chatId, history } = useTdlib()

  // We haven't selected a chat yet...
  if (!chatId) {
    return <ChatSelection />
  }

  // There are no messages to show
  if (isEmpty(history)) {
    return <EmptyChat />
  }

  return <Slideshow />
}
