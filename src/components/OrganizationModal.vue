<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <div class="form">
        <input v-model="form.name" placeholder="Название" />
        <input v-model="form.director" placeholder="ФИО директора" />
        <PhoneInput v-model="form.phone" />
        <input v-model="form.address.city" placeholder="Город" />
        <input v-model="form.address.street" placeholder="Улица" />
        <input v-model="form.address.house" placeholder="Дом" />
      </div>
      <div class="modal-actions">
        <BaseButton variant="secondary" @click="emit('cancel')">Отмена</BaseButton>
        <BaseButton
          @click="saveForm()"
          :disabled="!isFormValid"
        >
          OK
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import PhoneInput from './PhoneInput.vue'
import BaseButton from './BaseButton.vue'
import type { Organization } from '@/types'

// TODO: добавить валидацию email

const props = defineProps<{
  show: boolean
  title: string
  organization?: Organization | null
}>()

const emit = defineEmits<{
  cancel: []
  save: [org: Omit<Organization, 'id'>]
}>()

const form = ref({
  name: '',
  director: '',
  phone: '',
  address: {
    city: '',
    street: '',
    house: ''
  }
})

const isFormValid = computed(() => {
  const phoneDigits = form.value.phone.replace(/\D/g, '')
  const isPhoneValid = phoneDigits.length === 11 && phoneDigits.startsWith('7')

  const isValid = form.value.name && 
         form.value.director && 
         isPhoneValid && 
         form.value.address.city && 
         form.value.address.street && 
         form.value.address.house
  
  // console.log('valid:', isValid)
  return isValid
})

const clearForm = () => {
  const emptyForm = {
    name: '',
    director: '',
    phone: '',
    address: {
      city: '',
      street: '',
      house: ''
    }
  }
  form.value = emptyForm
}

const saveForm = () => {
  if (isFormValid.value) {
    emit('save', form.value)
    clearForm()
  }
}

watch(() => props.organization, (org) => {
  if (org) {
    form.value = { ...org }
  } else {
    clearForm()
  }
}, { immediate: true })
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 8px;
  min-width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}

.form input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>