import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import AppHeader from '../../components/AppHeader.vue'
import { useRoute } from 'vue-router'

// Mock matchMedia for PrimeVue components
beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addEventListener: () => { },
      removeEventListener: () => { },
      addListener: () => { },
      removeListener: () => { },
      dispatchEvent: () => false
    }
  }
})
const useRouterPush = vi.fn()

// Helper to mock useRoute and useRouter
vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn(),
    useRouter: () => ({ push: useRouterPush })
  }
})

const createWrapper = (routeMeta = {}) => {
  useRoute.mockReturnValue({ meta: routeMeta })
  return mount(AppHeader, {
    global: {
      plugins: [PrimeVue]
    }
  })
}

const openMenuItem = (wrapper: VueWrapper, index = 0) => {
  const menuItems = wrapper.vm.menuItems || wrapper.vm.$.setupState.menuItems
  const item = menuItems[index]
  if (item.command) {
    item.command()
  }
}

const toggleHelpDrawer = async (wrapper: VueWrapper) => {
  const helpButton = wrapper.find('[aria-label="Open help"]')
  return await helpButton.trigger('click')
}

describe('AppHeader', () => {
  it('renders menu items and navigates on click', async () => {
    useRoute.mockReturnValue({ meta: { showHelpButton: true } })
    const wrapper = createWrapper()
    const menuItemTexts = wrapper.findAll('.p-menuitem-text')
    expect(menuItemTexts[0].text()).toBe('Subtext Matcher')
    expect(menuItemTexts[1].text()).toBe('About')
    openMenuItem(wrapper, 1)
    expect(useRouterPush).toHaveBeenCalledWith('/about')
  })

  it('shows help button when route.meta.showHelpButton is true', () => {
    const wrapper = createWrapper({ showHelpButton: true })
    expect(wrapper.find('[aria-label="Open help"]').exists()).toBe(true)
  })

  it('does not show help button when route.meta.showHelpButton is false', () => {
    const wrapper = createWrapper({ showHelpButton: false })
    expect(wrapper.find('[aria-label="Open help"]').exists()).toBe(false)
  })

  it('does not show help button when route.meta is undefined', () => {
    const wrapper = createWrapper(undefined)
    expect(wrapper.find('[aria-label="Open help"]').exists()).toBe(false)
  })

  it('opens help drawer when help button is clicked', async () => {
    const wrapper = createWrapper({ showHelpButton: true })
    await toggleHelpDrawer(wrapper)
    // Sidebar should be visible in DOM
    expect(wrapper.vm.isHelpOpen).toBe(true)
  })

  it('closes help drawer when @hide is triggered', async () => {
    const wrapper = createWrapper({ showHelpButton: true })
    await toggleHelpDrawer(wrapper)
    // Simulate @hide event
    await wrapper.vm.closeHelp()
    expect(wrapper.vm.isHelpOpen).toBe(false)
  })
})
