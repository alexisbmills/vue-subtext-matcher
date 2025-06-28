import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MatchingResults from '../../components/MatchingResults.vue'
import PrimeVue from 'primevue/config'

const createWrapper = (props = {}) => {
  return mount(MatchingResults, {
    props: {
      matches: [],
      isLoading: false,
      hasSearched: false,
      ...props
    },
    global: {
      plugins: [PrimeVue]
    }
  })
}

describe('MatchingResults', () => {
  it('should show initial state', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Results will appear here')
  })

  it('should show loading state', () => {
    const wrapper = createWrapper({ isLoading: true })
    expect(wrapper.text()).toContain('Finding matches')
  })

  it('should show no results state', () => {
    const wrapper = createWrapper({
      hasSearched: true,
      matches: []
    })
    expect(wrapper.text()).toContain('No matches found')
  })

  it('should show results when matches found', () => {
    const wrapper = createWrapper({
      hasSearched: true,
      matches: [0, 5, 10]
    })
    expect(wrapper.text()).toContain('Matches Found (3)')
    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('10')
  })

  it('should have proper ARIA attributes', () => {
    const wrapper = createWrapper()
    const resultsContainer = wrapper.find('[aria-live="polite"]')
    expect(resultsContainer.exists()).toBe(true)
    expect(resultsContainer.attributes('aria-label')).toBe('Search results')
  })
})
