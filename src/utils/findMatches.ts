/**
 * Synchronous string matching implementation
 */
export function findMatches(text: string, subtext: string): number[] {
  if (!text || !subtext) return []

  const matches: number[] = []
  const lowerText = text.toLowerCase()
  const lowerSubtext = subtext.toLowerCase()

  let startIndex = 0
  let index = lowerText.indexOf(lowerSubtext, startIndex)

  while (index !== -1) {
    matches.push(index)
    startIndex = index + 1
    index = lowerText.indexOf(lowerSubtext, startIndex)
  }

  return matches
}
