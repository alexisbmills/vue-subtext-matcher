/**
 * Web Worker for string matching operations
 * Prevents UI blocking during intensive string operations
 */

interface MatchRequest {
  text: string
  subtext: string
}

interface MatchResponse {
  matches: number[]
}

self.onmessage = (event: MessageEvent<MatchRequest>) => {
  const { text, subtext } = event.data

  try {
    const matches = findMatches(text, subtext)
    const response: MatchResponse = { matches }
    self.postMessage(response)
  } catch (error) {
    self.postMessage({
      matches: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

function findMatches(text: string, subtext: string): number[] {
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

export {}
