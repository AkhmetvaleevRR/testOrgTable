<template>
  <button 
    :class="buttonClass" 
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()

const buttonClass = computed(() => {
  const base = 'btn'
  const variant = props.variant || 'primary'
  return `${base} ${base}--${variant}`
})
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn--primary {
  background: #007bff;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn--secondary {
  background: white;
  color: #333;
  border: 1px solid #ddd;
}

.btn--secondary:hover:not(:disabled) {
  background: #f8f9fa;
}

.btn--danger {
  background: #dc3545;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #c82333;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>