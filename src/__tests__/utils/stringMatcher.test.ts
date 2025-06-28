import { describe, it, expect } from 'vitest'
import { findSubtextMatches } from '../../utils/stringMatcher'

describe('stringMatcher', () => {
  describe('findSubtextMatches', () => {
    it('should find single match case-insensitive', async () => {
      const result = await findSubtextMatches('Hello World', 'hello')
      expect(result).toEqual([0])
    })

    it('should find multiple matches', async () => {
      const result = await findSubtextMatches('Hello World Hello Universe', 'hello')
      expect(result).toEqual([0, 12])
    })

    it('should return empty array when no matches found', async () => {
      const result = await findSubtextMatches('Hello World', 'xyz')
      expect(result).toEqual([])
    })

    it('should handle empty strings', async () => {
      const result1 = await findSubtextMatches('', 'test')
      const result2 = await findSubtextMatches('test', '')
      expect(result1).toEqual([])
      expect(result2).toEqual([])
    })

    it('should find overlapping matches', async () => {
      const result = await findSubtextMatches('aaa', 'aa')
      expect(result).toEqual([0, 1])
    })

    it('should handle special characters', async () => {
      const result = await findSubtextMatches('Test@123 Test@456', 'test@')
      expect(result).toEqual([0, 9])
    })

    it('should handle unicode characters', async () => {
      const result = await findSubtextMatches('Hello 🌍 World 🌍', '🌍')
      expect(result).toEqual([6, 15])
    })
  })
})