import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Organization } from '@/types'
export const useOrganizationsStore = defineStore('organizations', () => {
  const organizations = ref<Organization[]>([])
  const searchQuery = ref('')
  const currentPage = ref(1)
  const sortField = ref<'name' | 'director'>('name')
  const sortDirection = ref<'asc' | 'desc'>('asc')
  const itemsPerPage = 5

  const filteredOrgs = computed(() => {
    let result = organizations.value

    if (searchQuery.value) {
      result = result.filter((org) =>
        org.director.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    }

    result = [...result].sort((a, b) => {
      const fieldA = a[sortField.value].toLowerCase()
      const fieldB = b[sortField.value].toLowerCase()

      if (sortDirection.value === 'asc') {
        return fieldA.localeCompare(fieldB)
      } else {
        return fieldB.localeCompare(fieldA)
      }
    })

    return result
  })

  const totalPages = computed(() => Math.ceil(filteredOrgs.value.length / itemsPerPage))

  const paginatedOrgs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredOrgs.value.slice(start, end)
  })

  const sortBy = (field: 'name' | 'director') => {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }

  const addOrg = (orgData: Omit<Organization, 'id'>) => {
    // console.log('store: ', orgData)
    const org: Organization = {
      id: Date.now(), // генерация рандомного ID
      ...orgData,
    }

    organizations.value.push(org)
    // console.log(organizations.value.length)
    saveToLocalStorage()
  }

  const updateOrg = (id: number, orgData: Omit<Organization, 'id'>) => {
    const index = organizations.value.findIndex((org) => org.id === id)
    if (index !== -1) {
      organizations.value[index] = { ...orgData, id }
      saveToLocalStorage()
    }
  }

  const deleteOrg = (id: number) => {
    // const oldCount = organizations.value.length
    organizations.value = organizations.value.filter((org) => org.id !== id)
    // console.log(oldCount, organizations.value.length)
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('organizations', JSON.stringify(organizations.value))
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('organizations')
      if (saved) {
        const data = JSON.parse(saved)
        organizations.value = data
        // console.log(data.length)
      } else {
        // тестовые данные для первой загрузки
        const testData = [
          {
            id: 1,
            name: 'ООО "Вектор"',
            director: 'Иванов И.И.',
            phone: '+7 000 123 45 67',
            address: {
              city: 'Москва',
              street: 'Ленина',
              house: '1',
            },
          },
          {
            id: 2,
            name: 'ИП Сидоров С.С.',
            director: 'Сидоров С.С.',
            phone: '+7 000 56 78 99',
            address: {
              city: 'СПб',
              street: 'Невский',
              house: '2',
            },
          },
        ]
        organizations.value = testData
        // console.log('test data')
        saveToLocalStorage()
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e)
      organizations.value = []
    }
  }

  return {
    organizations,
    searchQuery,
    currentPage,
    sortField,
    sortDirection,
    filteredOrgs,
    totalPages,
    paginatedOrgs,
    sortBy,
    addOrg,
    updateOrg,
    deleteOrg,
    loadFromLocalStorage,
  }
})
