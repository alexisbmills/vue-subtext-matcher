import { describe, it, expect, vi } from 'vitest'
import { useSubtextMatcher } from '../../composables/useSubtextMatcher'

// Mock the string matcher utility
vi.mock('../../utils/stringMatcher', () => ({
  findSubtextMatches: vi.fn()
}))

describe('useSubtextMatcher', () => {
  it('should initialize with empty values', () => {
    const { text, subtext, matches, isLoading, hasSearched } = useSubtextMatcher()

    expect(text.value).toBe('')
    expect(subtext.value).toBe('')
    expect(matches.value).toEqual([])
    expect(isLoading.value).toBe(false)
    expect(hasSearched.value).toBe(false)
  })

  it('should validate form correctly', () => {
    const { text, subtext, isFormValid } = useSubtextMatcher()

    expect(isFormValid.value).toBe(false)

    text.value = 'Hello World'
    expect(isFormValid.value).toBe(false)

    subtext.value = 'Hello'
    expect(isFormValid.value).toBe(true)
  })

  it('should reset form correctly', () => {
    const { text, subtext, matches, hasSearched, resetForm } = useSubtextMatcher()

    text.value = 'Hello'
    subtext.value = 'World'
    matches.value = [0, 5]
    hasSearched.value = true

    resetForm()

    expect(text.value).toBe('')
    expect(subtext.value).toBe('')
    expect(matches.value).toEqual([])
    expect(hasSearched.value).toBe(false)
  })
})
