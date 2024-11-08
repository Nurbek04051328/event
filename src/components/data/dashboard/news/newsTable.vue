<template>
  <div class="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">

    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first"></th>
          <th scope="col" class="th truncate">Yangilik nomi</th>
          <th scope="col" class="th">Toifasi</th>
          <th scope="col" class="th">Tarjimalar</th>
          <th scope="col" class="th">Rasmlar</th>
          <th scope="col" class="th">Fayllar</th>
          <th scope="col" class="th">Ko'rildi</th>
          <th scope="col" class="th" width="150">Vaqti</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, itemIdx) in news" :key="item._id" :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          @click.stop="handleMain(item._id)">
          <td class="td-first">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">{{ item.translates?.at(0)?.title || '' }}</td>
          <td class="td">{{ item?.category?.translates?.at(0)?.title || '' }}</td>
          <td class="td">
            <div class="flex items-start gap-2">
              <button @click.stop="edit(item._id, lang._id)" :class="`${item?.translates?.some((tr) => tr.language == lang._id)
                ? 'success-btn'
                : 'edit-btn'
                } w-auto p-2 px-3`" v-for="lang of options?.languages" :key="lang._id">
                {{ lang.slug }}
              </button>
            </div>
          </td>
          <td class="td">{{ item.img?.length || 0 }}</td>
          <td class="td">{{ item.file?.length || 0 }}</td>
          <td class="td">{{ item.views }}</td>
          <td class="td">{{ convertDate(item.createdAt, 'full') }}</td>
          <td class="td-last">
            <button type="button" class="danger-btn size-10 ml-auto" @click.stop="confirmRemove(item._id)">
              <TrashIcon class="size-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialogModal title="Ma`lumotni o'chirmoqchimisiz?" btnTitle="Ha, o'chirilsin" @answer="remove" :dialog="toggle" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { convertDate } from '@/helpers/func'
import { TrashIcon } from '@heroicons/vue/24/outline'

const toggle = ref(false)
const limit = ref(30)
defineProps(['options'])

import { newsStore } from '@/stores/data/news';
import { storeToRefs } from 'pinia'
const store = newsStore();
const { news } = storeToRefs(store);

const getData = async () => {
  await store.getNews({
    limit: limit.value
  })
}

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()

const edit = (id, lang) => {
  usefull.setToggle(true, id, lang)
}

const _id = ref('')
const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
}

const remove = async (answer) => {
  if (answer) {
    await store.removeNews(_id.value)
  }
  close()
}

const close = () => {
  toggle.value = false
}

import { useRouter } from 'vue-router';
const router = useRouter();


function handleMain(id) {
  store.getNewsId(id)
  // Yangilik
  router.addRoute('defaultLayout', {
    path: '/Yangilik/' + id,
    name: 'Yangilik/' + id,
    component: () => import('@/views/dashboard/news/childNews.vue'),
    meta: {
      title: 'Yangilik/' + id,
      toggle: false,
      toggleTitle: ''
    }
  });

  // Yo'naltirish
  router.push({ name: 'Yangilik/' + id, });
}





onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
