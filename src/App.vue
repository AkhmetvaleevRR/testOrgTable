<template>
  <div class="app">
    <div class="controls">
      <SearchInput v-model="store.searchQuery" />
      <button @click="showAddModal = true" class="add-btn">Добавить</button>
    </div>

    <OrganizationTable
      :organizations="store.paginatedOrgs"
      :sort-field="store.sortField"
      :sort-direction="store.sortDirection"
      @sort="store.sortBy"
      @edit="editOrg"
      @delete="store.deleteOrg"
    />

    <Pagination
      :current-page="store.currentPage"
      :total-pages="store.totalPages"
      @prev="store.currentPage--"
      @next="store.currentPage++"
    />

    <OrganizationModal
      :show="showAddModal"
      title="Добавить организацию"
      @cancel="showAddModal = false"
      @save="addOrg"
    />

    <OrganizationModal
      :show="showEditModal"
      title="Редактировать организацию"
      :organization="editingOrg"
      @cancel="showEditModal = false"
      @save="saveEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import OrganizationTable from '@/components/OrganizationTable.vue'
import Pagination from '@/components/Pagination.vue'
import OrganizationModal from '@/components/OrganizationModal.vue'
import { useOrganizationsStore } from '@/stores/organizations'
import type { Organization } from '@/types'

const store = useOrganizationsStore()
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingOrg = ref<Organization | null>(null)

const addOrg = (orgData: Omit<Organization, 'id'>) => {
  console.log(orgData.name)
  store.addOrg(orgData)
  showAddModal.value = false
  // TODO: добавить уведомление
}

const editOrg = (org: Organization) => {
  console.log(org.id, org.name)
  editingOrg.value = { ...org }
  showEditModal.value = true
}

const saveEdit = (orgData: Omit<Organization, 'id'>) => {
  if (!editingOrg.value) return
  
  store.updateOrg(editingOrg.value.id, orgData)
  showEditModal.value = false
  editingOrg.value = null
}

onMounted(async () => {
  store.loadFromLocalStorage()
})
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.add-btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>