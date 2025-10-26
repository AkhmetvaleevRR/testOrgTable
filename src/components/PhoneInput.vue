<template>
  <input
    :value="displayValue"
    @input="handleInput"
    @blur="handleBlur"
    type="text"
    placeholder="+7 (999) 999-99-99"
    class="phone-input"
    :class="{ 'error': !isValid && modelValue }"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const displayValue = ref('')
const isValid = ref(true)

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  
  if (digits.length === 0) return ''
  if (digits.length <= 1) return `+7 (${digits}`
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}

const validatePhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('7')
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatPhone(target.value)
  displayValue.value = formatted
  emit('update:modelValue', formatted)
  isValid.value = validatePhone(formatted)
}

const handleBlur = () => {
  isValid.value = validatePhone(displayValue.value) || !displayValue.value
}

watch(() => props.modelValue, (newValue) => {
  displayValue.value = newValue
  isValid.value = validatePhone(newValue) || !newValue
}, { immediate: true })
</script>

<style scoped>
.phone-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
}

.phone-input.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.phone-input:focus {
  outline: none;
  border-color: #3b82f6;
}
</style>