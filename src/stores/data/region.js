import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { useNotification } from '../usefull/notification'

const base_url = '/api/region'

export const regionStore = defineStore('regionStore', () => {
  const regions = ref([])
  const regionCount = ref(0)
  const notification = useNotification()

  const getregions = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log(data)
    regions.value = [...data.data]
    regionCount.value = data.count
  }

  const addregion = async (region) => {
    const { data } = await api.post(base_url, region)
    regions.value = [data, ...regions.value]
    regionCount.value += 1

    notification.setNotif(true, 'Yangi ma`lumot qo`shildi', 'success')
  }

  const removeregion = async (id) => {
    await api.delete(`${base_url}/${id}`)
    regions.value = regions.value.filter((item) => item._id !== id)
    regionCount.value > 0 ? (regionCount.value -= 1) : 0
    notification.setNotif(true, 'O`chirildi', 'info')
  }

  const saveregion = async (region) => {
    console.log(region)
    const { data } = await api.put(`${base_url}`, region)
    console.log(data)
    regions.value = regions.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Yangilandi', 'info')
  }

  const getregion = async (id, language) => {
    return await api.get(`${base_url}/getone/${id}`, {
      params: {
        language
      }
    })
  }

  const listRegions = computed(() => {
    return [
      ...regions.value.map((country) => {
        return {
          _id: country._id,
          title: country?.translates?.at(0)?.title
        }
      })
    ]
  })

  return {
    regions,
    regionCount,
    addregion,
    saveregion,
    removeregion,
    getregions,
    getregion,
    listRegions
  }
})
