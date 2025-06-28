<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { required } from '@vee-validate/rules'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'

interface Props {
  text: string
  subtext: string
  isLoading: boolean
}

interface Emits {
  (e: 'update:text', value: string): void
  (e: 'update:subtext', value: string): void
  (e: 'submit'): void
  (e: 'reset'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { defineField, errors, validate, resetForm: resetVeeValidateForm, meta } = useForm({
  validationSchema: {
    text: required,
    subtext: required
  }
})

const [text, textAttrs] = defineField('text')
const [subtext, subtextAttrs] = defineField('subtext')

// Sync with parent
text.value = props.text
subtext.value = props.subtext

const isFormValid = computed(() => {
  return props.text.trim() !== '' && props.subtext.trim() !== ''
})

// Only show errors for touched fields
const showTextError = computed(() => {
  return errors.value.text && meta.value.touched
})

const showSubtextError = computed(() => {
  return errors.value.subtext && meta.value.touched
})

const handleSubmit = async () => {
  const { valid } = await validate()
  if (valid) {
    emit('submit')
  }
}

const handleReset = () => {
  text.value = ''
  subtext.value = ''
  // Clear VeeValidate form state including errors and touched state
  resetVeeValidateForm()
  emit('reset')
}

// Watch for changes and emit to parent
const updateText = (value: string) => {
  text.value = value
  emit('update:text', value)
}

const updateSubtext = (value: string) => {
  subtext.value = value
  emit('update:subtext', value)
}

// Watch for external reset (from parent component)
watch(() => props.text, (newValue) => {
  if (newValue === '' && text.value !== '') {
    resetVeeValidateForm()
  }
})
</script>

<template>
  <Card class="form-card">
    <template #title>
      <h2>Find Matches</h2>
    </template>
    
    <template #content>
      <form @submit.prevent="handleSubmit" class="matcher-form">
        <div class="form-field">
          <label for="text-input" class="field-label">
            Text <span class="required-indicator">*</span>
          </label>
          <Textarea
            id="text-input"
            :model-value="text"
            @update:model-value="updateText"
            v-bind="textAttrs"
            placeholder="Enter your main text here..."
            rows="6"
            class="w-full"
            :class="{ 'p-invalid': showTextError }"
            aria-describedby="text-error"
          />
          <Message
            v-if="showTextError"
            id="text-error"
            severity="error"
            :closable="false"
            class="form-error"
          >
            {{ errors.text }}
          </Message>
        </div>

        <div class="form-field">
          <label for="subtext-input" class="field-label">
            Subtext <span class="required-indicator">*</span>
          </label>
          <InputText
            id="subtext-input"
            :model-value="subtext"
            @update:model-value="updateSubtext"
            v-bind="subtextAttrs"
            placeholder="Enter text to search for..."
            class="w-full"
            :class="{ 'p-invalid': showSubtextError }"
            aria-describedby="subtext-error"
          />
          <Message
            v-if="showSubtextError"
            id="subtext-error"
            severity="error"
            :closable="false"
            class="form-error"
          >
            {{ errors.subtext }}
          </Message>
        </div>

        <div class="form-actions">
          <Button
            type="submit"
            label="Match"
            icon="pi pi-search"
            :loading="isLoading"
            :disabled="!isFormValid"
            class="match-button"
          />
          <Button
            type="button"
            label="Reset"
            icon="pi pi-refresh"
            severity="secondary"
            outlined
            @click="handleReset"
            :disabled="isLoading"
          />
        </div>
      </form>
    </template>
  </Card>
</template>

<style scoped>
.form-card {
  height: fit-content;
}

.matcher-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.875rem;
}

.required-indicator {
  color: var(--red-500);
}

.form-error {
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.match-button {
  flex: 1;
  min-width: 120px;
}

@media (min-width: 576px) {
  .form-actions {
    flex-wrap: nowrap;
  }
}
</style>