import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/api/news'

export const newsStore = defineStore('newsStore', () => {
  const news = ref([]);
  const newsCount = ref(0);
  const notification = useNotification();

  const getNews = async (params) => {
    const { data } = await api.get(base_url, params);
    news.value = data?.data;
    newsCount.value = data?.count;
  }

  const addNews = async (category) => {
    const { data } = await api.post(base_url, category);
    news.value = [data, ...news.value];
    newsCount.value += 1;
    notification.setNotif(true, 'Yangilik qo`shildi', 'success');
  }

  const removeNews = async (id) => {
    await api.delete(`${base_url}/${id}`);
    news.value = news.value.filter((item) => item._id !== id);
    newsCount.value > 0 ? (newsCount.value -= 1) : 0;
    notification.setNotif(true, 'Yangilik o`chirildi', 'info');
  }

  const saveNews = async (category) => {
    const { data } = await api.put(`${base_url}`, category);
    news.value = news.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    });
    notification.setNotif(true, 'Yangilik yangilandi', 'info');
  }

  const getNewsId = async (id, language) => {
    return await api.get(`${base_url}/${id}`, {
      params: {
        language
      }
    })
  }

  const listnews = computed(() => {
    return [
      ...news.value.map((news) => {
        return {
          _id: news._id,
          title: news?.translates?.at(0)?.title,
        }
      })
    ]
  });

  return {
    news,
    newsCount,
    getNews,
    addNews,
    removeNews,
    saveNews,
    getNewsId,
    listnews
  }
})