<template>
  <table class="org-table">
    <thead>
      <tr>
        <th @click="$emit('sort', 'name')" class="sortable">
          Название
          <span class="sort-icon">
            <span v-if="sortField === 'name' && sortDirection === 'asc'">↑</span>
            <span v-else-if="sortField === 'name' && sortDirection === 'desc'">↓</span>
            <span v-else>↕</span>
          </span>
        </th>
        <th @click="$emit('sort', 'director')" class="sortable">
          ФИО директора
          <span class="sort-icon">
            <span v-if="sortField === 'director' && sortDirection === 'asc'">↑</span>
            <span v-else-if="sortField === 'director' && sortDirection === 'desc'">↓</span>
            <span v-else>↕</span>
          </span>
        </th>
        <th>Номер телефона</th>
        <th>Адрес</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="org in organizations"
        :key="org.id"
        @click="$emit('edit', org)"
        class="table-row"
      >
        <td>{{ org.name }}</td>
        <td>{{ org.director }}</td>
        <td>{{ org.phone }}</td>
        <td>{{ formatAddress(org.address) }}</td>
        <td @click.stop class="delete-cell">
          <BaseButton variant="danger" @click="$emit('delete', org.id)">X</BaseButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import type { Organization, Address } from '@/types'

defineProps<{
  organizations: Organization[]
  sortField: 'name' | 'director'
  sortDirection: 'asc' | 'desc'
}>()

defineEmits<{
  sort: [field: 'name' | 'director']
  edit: [org: Organization]
  delete: [id: number]
}>()

const formatAddress = (address: Address) => {
  return `г. ${address.city}, ул. ${address.street}, д. ${address.house}`
}
</script>

<style scoped>
.org-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.org-table th,
.org-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.org-table th {
  background: #f8f9fa;
  user-select: none;
}

.sortable {
  cursor: pointer;
  position: relative;
}

.sort-icon {
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}

.table-row:hover {
  background: #f5f5f5;
  cursor: pointer;
}

.delete-cell {
  text-align: center;
}
</style>