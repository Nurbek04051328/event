import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'



const base_url = '/activation-key'

export const activationStore = defineStore('activationStore', () => {
  const activations = ref([])
  const activationCount = ref(0)


  const getActivations = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log("data", data);
    
    activations.value = [...data.activationKeys]
    activationCount.value = data.count
  }
  

  return {
    activations,
    activationCount,
    getActivations,
  }
})