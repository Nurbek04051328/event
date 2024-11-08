import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/api/page'

export const pageStore = defineStore('pageStore', () => {
  const pages = ref([])
  const pageCount = ref(0)
  const notification = useNotification()

  const getPages = async (params) => {
    const { data } = await api.get(base_url, params)
    pages.value = data?.data;
    pageCount.value = data?.count;
  }

  const addPages = async (page) => {
    const { data } = await api.post(base_url, page)
    pages.value = [data, ...pages.value]
    pageCount.value += 1
    notification.setNotif(true, 'Yangi page qo`shildi', 'success')
  }

  const removePage = async (id) => {
    await api.delete(`${base_url}/${id}`)
    pages.value = pages.value.filter((item) => item._id !== id)
    pageCount.value > 0 ? (pageCount.value -= 1) : 0
    notification.setNotif(true, 'Page o`chirildi', 'info')
  }

  const savePage = async (page) => {
    const { data } = await api.put(`${base_url}`, page)
    pages.value = pages.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Yangilandi', 'info')
  }

  const getPage = async (id, language) => {
    return await api.get(`${base_url}/${id}`, {
      params: {
        language
      }
    })
  }

  const listPages = computed(() => {
    return [
      ...pages.value.map((page) => {
        return {
          _id: page._id,
          title: page?.translates?.at(0)?.title,
        }
      })
    ]
  })

  return {
    pages,
    pageCount,
    getPages,
    addPages,
    removePage,
    savePage,
    getPage,
    listPages
  }
})
