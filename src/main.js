import '@/assets/styles/app.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

import headPart from '@/components/default/headPart.vue'
import defaultModal from '@/components/default/defaultModal.vue'
import defaultInput from '@/components/default/defaultInput.vue'
import defaultTextarea from '@/components/default/defaultTextarea.vue'
import defaultSelect from '@/components/default/defaultSelect.vue'
import dublicatSelect from './components/default/dublicatSelect.vue'
import defaultCheckbox from '@/components/default/defaultCheckbox.vue'
import dialogModal from '@/components/default/dialogModal.vue'
import phoneMaska from '@/components/default/phoneMaska.vue'


const app = createApp(App)

app.component('dialogModal', dialogModal)
app.component('headPart', headPart)
app.component('defaultModal', defaultModal)
app.component('defaultInput', defaultInput)
app.component('defaultTextarea', defaultTextarea)
app.component('defaultSelect', defaultSelect)
app.component('dublicatSelect', dublicatSelect)
app.component('defaultCheckbox', defaultCheckbox)
app.component('phoneMaska', phoneMaska)

app.use(VueCookies, { expires: '7d' })
app.use(createPinia())
app.use(router)

app.mount('#app')
