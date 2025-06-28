import type { DirectiveBinding } from 'vue'

interface HighlightElement extends HTMLElement {
  _highlightApplied?: boolean
}

export const highlightDirective = {
  mounted(el: HighlightElement, binding: DirectiveBinding) {
    // Add the highlight class
    el.classList.add('match-highlight')
    
    // Mark as applied to prevent re-application
    el._highlightApplied = true
    
    // Remove animation class after animation completes
    setTimeout(() => {
      el.classList.remove('match-highlight')
    }, 500)
  },
  
  updated(el: HighlightElement, binding: DirectiveBinding) {
    // Only apply if not already applied (for new elements)
    if (!el._highlightApplied) {
      el.classList.add('match-highlight')
      el._highlightApplied = true
      
      setTimeout(() => {
        el.classList.remove('match-highlight')
      }, 500)
    }
  }
}