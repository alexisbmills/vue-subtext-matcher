import { ref } from 'vue'

export function useHelpDrawer() {
  const isHelpOpen = ref(false)

  const toggleHelp = () => {
    isHelpOpen.value = !isHelpOpen.value
  }

  const closeHelp = () => {
    isHelpOpen.value = false
  }

  const openHelp = () => {
    isHelpOpen.value = true
  }

  return {
    isHelpOpen,
    toggleHelp,
    closeHelp,
    openHelp
  }
}