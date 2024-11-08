import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/event-category'

export const subcategoryStore = defineStore('subcategoryStore', () => {
  const subcategories = ref([])
  const subcategoryCount = ref(0)
  const notification = useNotification()

  const getSubcategories = async (params) => {
    const { data } = await api.get(base_url, params)
    console.log("data", data);
    
    subcategories.value = data?.eventCategories;
    subcategoryCount.value = data?.count;
  }

  const addSubcategory = async (category) => {
    console.log("postcat", category);
    
    const { data } = await api.post(base_url, category)
    subcategories.value = [data,...subcategories.value]
    subcategoryCount.value += 1
    notification.setNotif(true, 'Yangi ma`lumot qo`shildi', 'success')
  }

  const removeSubcategory = async (id) => {
    await api.delete(`${base_url}/${id}`)
    subcategories.value = subcategories.value.filter((item) => item._id !== id)
    subcategoryCount.value > 0 ? (subcategoryCount.value -= 1) : 0
    notification.setNotif(true, 'O`chirildi', 'info')
  }

  const saveSubcategory = async (category) => {
    console.log("category", category);
    
    const { data } = await api.put(`${base_url}`, category)
    subcategories.value = subcategories.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Yangilandi', 'info')
  }

  const getSubcategory = async (id, language) => {
    console.log("id", id, "language", language);
    
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const listCategories = computed(() => {
    return [
      ...subcategories.value.map((category) => {
        return {
          _id: category._id,
          title: category?.translates?.at(0)?.title,
        }
      })
    ]
  })

  return {
    subcategories,
    subcategoryCount,
    getSubcategories,
    addSubcategory,
    removeSubcategory,
    saveSubcategory,
    getSubcategory,
    listCategories
  }
})