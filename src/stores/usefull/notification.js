import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotification = defineStore('useNotification', () => {
  const notif = ref({
    show: false,
    msg: '',
    type: 'success'
  })

  const setNotif = (show, msg, type, time = 4000) => {
    notif.value = {
      show,
      msg,
      type
    }

    setTimeout(() => {
      notif.value = {
        show: false,
        msg: ''
      }
    }, time)
  }

  return {
    notif,
    setNotif
  }
})
