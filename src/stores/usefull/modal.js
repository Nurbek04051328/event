import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFullStore = defineStore('useFullStore', () => {
  const toggle = ref(false)
  const id = ref('');
  const lang = ref('');
  const setToggle = (value, _id = '', l = 'uz') => {
    
    toggle.value = value
    id.value = _id
    lang.value = l
  }

  return {
    toggle,
    setToggle,
    id,
    lang,
  }
})
