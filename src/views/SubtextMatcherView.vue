<script setup lang="ts">
import SubtextMatcherForm from '../components/SubtextMatcherForm.vue'
import MatchingResults from '../components/MatchingResults.vue'
import { useSubtextMatcher } from '../composables/useSubtextMatcher'

const {
  text,
  subtext,
  matches,
  isLoading,
  hasSearched,
  findMatches,
  resetForm
} = useSubtextMatcher()
</script>

<template>
  <div class="subtext-matcher-view">
    <div class="content-grid">
      <div class="form-section">
        <SubtextMatcherForm
          v-model:text="text"
          v-model:subtext="subtext"
          :is-loading="isLoading"
          @submit="findMatches"
          @reset="resetForm"
        />
      </div>

      <div class="results-section">
        <MatchingResults :matches="matches" :is-loading="isLoading" :has-searched="hasSearched" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtext-matcher-view {
  padding: 1rem 0;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section,
.results-section {
  flex: 1;
}

@media (min-width: 768px) {
  .content-grid {
    flex-direction: row;
    gap: 3rem;
  }

  .form-section {
    flex: 0 0 45%;
  }

  .results-section {
    flex: 1;
  }
}
</style>
