<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

const portfolioLinks = [
  {
    title: 'GitHub Profile',
    description: 'View my open source projects and contributions',
    url: 'https://github.com/example',
    icon: 'pi pi-github'
  },
  {
    title: 'Portfolio Website',
    description: 'Explore my professional work and case studies',
    url: 'https://example.com',
    icon: 'pi pi-globe'
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    url: 'https://linkedin.com/in/example',
    icon: 'pi pi-linkedin'
  }
]
</script>

<template>
  <div class="about-view">
    <div class="hero-section">
      <h1>About Subtext Matcher</h1>
      <p class="hero-description">
        A modern, accessible, and performant string matching application built with Vue 3,
        TypeScript, and PrimeVue. This tool helps you find case-insensitive substring
        matches and displays their starting positions within your text.
      </p>
    </div>

    <div class="features-section">
      <h2>Key Features</h2>
      <div class="features-grid">
        <Card class="feature-card">
          <template #content>
            <div class="feature-icon">
              <i class="pi pi-search" />
            </div>
            <h3>Smart Matching</h3>
            <p>Case-insensitive substring matching with precise character position tracking.</p>
          </template>
        </Card>

        <Card class="feature-card">
          <template #content>
            <div class="feature-icon">
              <i class="pi pi-mobile" />
            </div>
            <h3>Responsive Design</h3>
            <p>Mobile-first approach ensuring optimal experience across all device sizes.</p>
          </template>
        </Card>

        <Card class="feature-card">
          <template #content>
            <div class="feature-icon">
              <i class="pi pi-eye" />
            </div>
            <h3>Accessibility First</h3>
            <p>
              Built with WCAG 2.1 AA compliance, screen reader support,
              and keyboard navigation.
            </p>
          </template>
        </Card>

        <Card class="feature-card">
          <template #content>
            <div class="feature-icon">
              <i class="pi pi-cog" />
            </div>
            <h3>High Performance</h3>
            <p>
              Web Worker implementation ensures UI remains responsive during
              complex operations.
            </p>
          </template>
        </Card>
      </div>
    </div>

    <div class="portfolio-section">
      <h2>More of My Work</h2>
      <div class="portfolio-grid">
        <Card v-for="link in portfolioLinks" :key="link.title" class="portfolio-card">
          <template #content>
            <div class="portfolio-content">
              <div class="portfolio-icon">
                <i :class="link.icon" />
              </div>
              <div class="portfolio-info">
                <h3>{{ link.title }}</h3>
                <p>{{ link.description }}</p>
              </div>
              <Button
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                icon="pi pi-external-link"
                severity="secondary"
                text
                rounded
                :aria-label="`Visit ${link.title}`"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 1000px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-color-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-section,
.portfolio-section {
  margin-bottom: 3rem;
}

.features-section h2,
.portfolio-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--primary-color);
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.feature-card {
  text-align: center;
  height: 100%;
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.portfolio-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.portfolio-card {
  width: 100%;
}

.portfolio-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.portfolio-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  flex-shrink: 0;
}

.portfolio-info {
  flex: 1;
}

.portfolio-info h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.portfolio-info p {
  color: var(--text-color-secondary);
  margin: 0;
}

@media (min-width: 576px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .hero-section h1 {
    font-size: 3rem;
  }

  .hero-description {
    font-size: 1.25rem;
  }
}

@media (min-width: 992px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
