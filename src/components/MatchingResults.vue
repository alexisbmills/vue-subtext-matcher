<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'

interface Props {
  matches: number[]
  isLoading: boolean
  hasSearched: boolean
}

const props = defineProps<Props>()

const displayState = computed(() => {
  if (props.isLoading) return 'loading'
  if (!props.hasSearched) return 'initial'
  if (props.matches.length === 0) return 'no-results'
  return 'has-results'
})
</script>

<template>
  <Card class="results-card">
    <template #title>
      <h2>Matching Results</h2>
    </template>
    
    <template #content>
      <div class="results-container" aria-live="polite" aria-label="Search results">
        <!-- Loading State -->
        <div v-if="displayState === 'loading'" class="results-state loading-state">
          <ProgressSpinner style="width: 2rem; height: 2rem" />
          <p>Finding matches...</p>
        </div>

        <!-- Initial State -->
        <div v-else-if="displayState === 'initial'" class="results-state initial-state">
          <i class="pi pi-search state-icon" />
          <p>Results will appear here.</p>
          <p class="state-hint">Enter text and subtext, then click "Match" to find matches.</p>
        </div>

        <!-- No Results State -->
        <div v-else-if="displayState === 'no-results'" class="results-state no-results-state">
          <i class="pi pi-info-circle state-icon" />
          <p>No matches found.</p>
          <p class="state-hint">Try adjusting your search terms.</p>
        </div>

        <!-- Results Found State -->
        <div v-else class="results-found">
          <h3 class="results-title">
            Matches Found ({{ matches.length }})
          </h3>
          <p class="results-description">
            Starting character positions:
          </p>
          <div class="matches-container">
            <span
              v-for="(match, index) in matches"
              :key="`${match}-${index}`"
              v-highlight
              class="match-index"
              :aria-label="`Match found at position ${match}`"
            >
              {{ match }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.results-card {
  height: fit-content;
  min-height: 300px;
}

.results-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.results-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  padding: 2rem 1rem;
  color: var(--text-color-secondary);
}

.state-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  opacity: 0.6;
}

.loading-state {
  gap: 1rem;
}

.state-hint {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.results-found {
  padding: 1rem 0;
}

.results-title {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.results-description {
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.matches-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: flex-start;
}

.match-index {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  background-color: var(--yellow-100);
  border: 1px solid var(--yellow-400);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--yellow-900);
  cursor: default;
  transition: all 0.2s ease;
}

.match-index:hover {
  background-color: var(--yellow-200);
  border-color: var(--yellow-500);
  transform: translateY(-1px);
}

@keyframes pulse-animation {
  0% { 
    transform: scale(0.95); 
    opacity: 0.7; 
  }
  70% { 
    transform: scale(1.05); 
    opacity: 1; 
  }
  100% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

.match-highlight {
  animation: pulse-animation 0.5s ease-out;
}
</style>