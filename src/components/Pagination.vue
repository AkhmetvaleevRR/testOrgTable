<template>
  <div class="pagination">
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="page-btn"
    >
      Назад
    </button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="page-btn"
    >
      Вперед
    </button>
  </div>
</template>

<script setup lang="ts">
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

.page-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>