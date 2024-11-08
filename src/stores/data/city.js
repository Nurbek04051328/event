import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { useNotification } from '../usefull/notification';

const base_url = '/api/city';

export const cityStore = defineStore('cityStore', () => {
  const citys = ref([])
  const cityCount = ref(0)
  const notification = useNotification()

  const getcitys = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log(data)
    citys.value = [...data.data]
    cityCount.value = data.count
  }

  const addcity = async (city) => {
    const { data } = await api.post(base_url, city)
    citys.value = [data, ...citys.value]
    cityCount.value += 1

    notification.setNotif(true, 'Yangi ma`lumot qo`shildi', 'success')
  }

  const removecity = async (id) => {
    await api.delete(`${base_url}/${id}`)
    citys.value = citys.value.filter((item) => item._id !== id)
    cityCount.value > 0 ? (cityCount.value -= 1) : 0
    notification.setNotif(true, 'O`chirildi', 'info')
  }

  const savecity = async (city) => {
    console.log(city)
    const { data } = await api.put(`${base_url}`, city)
    console.log(data)
    citys.value = citys.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Yangilandi', 'info')
  }

  const getcity = async (id, language) => {
    return await api.get(`${base_url}/getone/${id}`, {
      params: {
        language
      }
    })
  }

  const listRegions = computed(() => {
    return [
      ...citys.value.map((country) => {
        return {
          _id: country._id,
          title: country?.translates?.at(0)?.title
        }
      })
    ]
  })

  return {
    citys,
    cityCount,
    addcity,
    savecity,
    removecity,
    getcitys,
    getcity,
    listRegions
  }
})
