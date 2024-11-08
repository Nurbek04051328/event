import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { useNotification } from '../usefull/notification'

const base_url = '/api/school'

export const schoolStore = defineStore('schoolStore', () => {
    const schools = ref([])
    const schoolCount = ref(0)
    const notification = useNotification()

    const getschools = async (params) => {
        const { data } = await api.get(base_url, { params })
        console.log(data)
        schools.value = [...data.data]
        schoolCount.value = data.count
    }

    const addschool = async (school) => {
        const { data } = await api.post(base_url, school);
        schools.value = [data, ...schools.value];
        schoolCount.value += 1;

        notification.setNotif(true, 'Yangi ma`lumot qo`shildi', 'success');
    }

    const removeschool = async (id) => {
        await api.delete(`${base_url}/${id}`);
        schools.value = schools.value.filter((item) => item._id !== id);
        schoolCount.value > 0 ? (schoolCount.value -= 1) : 0;
        notification.setNotif(true, 'O`chirildi', 'info');
    }

    const saveschool = async (school) => {
        console.log(school)
        const { data } = await api.put(`${base_url}`, school)
        console.log(data)
        schools.value = schools.value.map((pay) => {
            if (pay._id == data._id) return data
            return pay
        })
        notification.setNotif(true, 'Yangilandi', 'info')
    }

    const getschool = async (id, language) => {
        return await api.get(`${base_url}/getone/${id}`, {
            params: {
                language
            }
        })
    }

    const listschools = computed(() => {
        return [
            ...schools.value.map((school) => {
                return {
                    _id: school._id,
                    title: school?.translates?.at(0)?.title,
                }
            })
        ]
    })

    return {
        schools,
        schoolCount,
        addschool,
        saveschool,
        removeschool,
        getschools,
        getschool,
        listschools
    }
})
