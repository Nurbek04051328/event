import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { useNotification } from '../usefull/notification'

const base_url = '/api/country'

export const countryStore = defineStore('countryStore', () => {
  const countrys = ref([])
  const countryCount = ref(0)
  const notification = useNotification()

  const getcountrys = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log(data)
    countrys.value = [...data.data]
    countryCount.value = data.count
  }

  const addcountry = async (country) => {
    const { data } = await api.post(base_url, country)
    countrys.value = [data, ...countrys.value]
    countryCount.value += 1

    notification.setNotif(true, 'Yangi ma`lumot qo`shildi', 'success')
  }

  const removecountry = async (id) => {
    await api.delete(`${base_url}/${id}`)
    countrys.value = countrys.value.filter((item) => item._id !== id)
    countryCount.value > 0 ? (countryCount.value -= 1) : 0
    notification.setNotif(true, 'O`chirildi', 'info')
  }

  const savecountry = async (country) => {
    console.log(country)
    const { data } = await api.put(`${base_url}`, country)
    console.log(data)
    countrys.value = countrys.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Yangilandi', 'info')
  }

  const getcountry = async (id, language) => {
    return await api.get(`${base_url}/getone/${id}`, {
      params: {
        language
      }
    })
  }

  const listCountrys = computed(() => {
    return [
      ...countrys.value.map((country) => {
        return {
          _id: country._id,
          title: country?.translates?.at(0)?.title
        }
      })
    ]
  })

  return {
    countrys,
    countryCount,
    addcountry,
    savecountry,
    removecountry,
    getcountrys,
    getcountry,
    listCountrys
  }
})
