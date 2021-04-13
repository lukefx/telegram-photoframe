/**
 * Returns a list of media messages from the current history
 * @param {Array} history Message's history
 */
export function getMediaMessages (history) {
  return history.filter(message =>
    ['messagePhoto', 'messageVideo'].includes(message?.content?.['@type'])
  )
}
