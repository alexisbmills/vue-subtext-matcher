import { findMatches } from '../utils/findMatches'

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

export { }
