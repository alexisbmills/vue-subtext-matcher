import { ref, computed } from 'vue'
import { findSubtextMatches } from '../utils/stringMatcher'

export function useSubtextMatcher() {
  const text = ref('')
  const subtext = ref('')
  const matches = ref<number[]>([])
  const isLoading = ref(false)
  const hasSearched = ref(false)

  const isFormValid = computed(() => {
    return text.value.trim() !== '' && subtext.value.trim() !== ''
  })

  const findMatches = async () => {
    if (!isFormValid.value) return

    isLoading.value = true
    hasSearched.value = true

    try {
      const result = await findSubtextMatches(text.value, subtext.value)
      matches.value = result
    } catch (error) {
      console.error('Error finding matches:', error)
      matches.value = []
    } finally {
      isLoading.value = false
    }
  }

  const resetForm = () => {
    text.value = ''
    subtext.value = ''
    matches.value = []
    hasSearched.value = false
    isLoading.value = false
  }

  return {
    text,
    subtext,
    matches,
    isLoading,
    hasSearched,
    isFormValid,
    findMatches,
    resetForm
  }
}
