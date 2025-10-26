<template>
  <div class="pagination">
    <BaseButton
      variant="secondary"
      @click="$emit('prev')"
      :disabled="currentPage === 1"
    >
      Назад
    </BaseButton>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <BaseButton
      variant="secondary"
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
    >
      Вперед
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineOptions({
  name: 'PaginationComponent'
})

defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>