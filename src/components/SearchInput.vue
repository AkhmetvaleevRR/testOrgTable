<template>
  <div class="search-container">
    <input
      :value="modelValue"
      @input="handleInputUpdate"
      type="text"
      placeholder="Поиск по ФИО директора..."
      class="search-input"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInputUpdate = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
} 
</script>

<style scoped>
.search-container {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  line-height: 32px;
  border: 2px solid #e5e7eb;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.search-input::placeholder {
  color: #9ca3af;
}
</style>