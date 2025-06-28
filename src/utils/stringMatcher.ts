/**
 * Finds all case-insensitive matches of a subtext within a text using Web Worker
 * @param text - The main text to search in
 * @param subtext - The substring to search for
 * @returns Promise<number[]> - Array of starting indices where matches are found
 */
export function findSubtextMatches(text: string, subtext: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    // For simple cases, handle synchronously to avoid Web Worker overhead
    if (text.length < 1000 && subtext.length < 100) {
      resolve(findMatchesSynchronously(text, subtext))
      return
    }

    // Use Web Worker for larger inputs
    const worker = new Worker(
      new URL('../workers/stringMatcherWorker.ts', import.meta.url),
      { type: 'module' }
    )

    worker.postMessage({ text, subtext })

    worker.onmessage = (event) => {
      resolve(event.data.matches)
      worker.terminate()
    }

    worker.onerror = (error) => {
      reject(error)
      worker.terminate()
    }

    // Timeout after 5 seconds
    setTimeout(() => {
      worker.terminate()
      reject(new Error('String matching operation timed out'))
    }, 5000)
  })
}

/**
 * Synchronous string matching implementation
 */
function findMatchesSynchronously(text: string, subtext: string): number[] {
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