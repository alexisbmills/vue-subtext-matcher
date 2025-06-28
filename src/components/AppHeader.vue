<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import { useHelpDrawer } from '../composables/useHelpDrawer'

const route = useRoute()
const router = useRouter()
const { isHelpOpen, toggleHelp, closeHelp } = useHelpDrawer()

const showHelpButton = computed(() => route.meta?.showHelpButton === true)

const menuItems = [
  {
    label: 'Subtext Matcher',
    icon: 'pi pi-search',
    command: () => router.push('/')
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => router.push('/about')
  }
]
</script>

<template>
  <header>
    <Menubar :model="menuItems" class="app-menubar">
      <template #start>
        <span class="app-title">Subtext Matcher</span>
      </template>
      <template #end>
        <Button
          v-if="showHelpButton"
          icon="pi pi-question-circle"
          severity="secondary"
          text
          rounded
          aria-label="Open help"
          @click="toggleHelp"
        />
      </template>
    </Menubar>

    <!-- Help Drawer -->
    <Sidebar
      v-model:visible="isHelpOpen"
      position="right"
      class="help-drawer"
      @hide="closeHelp"
    >
      <template #header>
        <h2>How to Use</h2>
      </template>
      
      <div class="help-content">
        <div class="help-section">
          <h3>Quick Guide</h3>
          <ol>
            <li>Enter your main text in the "Text" field</li>
            <li>Enter the substring you want to find in the "Subtext" field</li>
            <li>Click "Match" to find all occurrences</li>
            <li>View the starting character positions of each match</li>
          </ol>
        </div>

        <div class="help-section">
          <h3>Example</h3>
          <p><strong>Text:</strong> "Hello World! Hello Universe!"</p>
          <p><strong>Subtext:</strong> "hello"</p>
          <p><strong>Results:</strong> Matches found at positions 0 and 13</p>
        </div>

        <div class="help-section">
          <h3>Features</h3>
          <ul>
            <li>Case-insensitive matching</li>
            <li>Multiple match detection</li>
            <li>Character position indexing (starts at 0)</li>
            <li>Real-time form validation</li>
          </ul>
        </div>
      </div>
    </Sidebar>
  </header>
</template>

<style scoped>
.app-title {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.app-menubar {
  border-radius: 0;
  border-left: none;
  border-right: none;
}

.help-drawer {
  width: 90vw;
  max-width: 400px;
}

.help-content {
  padding: 1rem 0;
}

.help-section {
  margin-bottom: 2rem;
}

.help-section h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.help-section ol,
.help-section ul {
  padding-left: 1.5rem;
}

.help-section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.help-section p {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .help-drawer {
    width: 400px;
  }
}
</style>