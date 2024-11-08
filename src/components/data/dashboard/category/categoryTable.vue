<template>
  <div class="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">

    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first"></th>
          <th scope="col" class="th">Toifa nomi</th>
          <th scope="col" class="th">Tarjimalar</th>
          <th scope="col" class="th">Rasmlar</th>
          <th scope="col" class="th" width="150">Vaqti</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, itemIdx) in categories" :key="item._id" :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'">
          <td class="td-first">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">{{ item.title || '' }}</td>
          <td class="td">
            <div class="flex items-start gap-2">
              <button @click="edit(item._id, lang.slug)" :class="`${item?.translates?.some((tr) => tr.language == lang._id)
                ? 'success-btn'
                : 'edit-btn'
                } w-auto p-2 px-3`" v-for="lang of options?.languages" :key="lang._id">
                {{ lang.slug }}
              </button>
            </div>
          </td>
          <td class="td">{{ item.img?.length || 0 }}</td>
          <td class="td">{{ convertDate(item.createdAt, 'full') }}</td>
          <td class="td-last">
            <button type="button" class="danger-btn size-9 ml-auto" @click="confirmRemove(item._id)">
              <TrashIcon class="size-4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialogModal title="Ma`lumotni o'chirmoqchimisiz?" btnTitle="Ha, o'chirilsin" @answer="remove" :dialog="toggle" />
</template>
<script setup>
import { ref } from 'vue'
import { convertDate } from '@/helpers/func'
import { TrashIcon } from '@heroicons/vue/24/outline'

const toggle = ref(false)
// const limit = ref(30)
defineProps(['options'])

import { categoryStore } from '@/stores/data/categories';
import { storeToRefs } from 'pinia'
const store = categoryStore();
const { categories } = storeToRefs(store);

// const getData = async () => {
//   await store.getCategories({
//     limit: limit.value
//   })
// }

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const edit = (id, lang) => {
  console.log("id", id, lang);
  
  usefull.setToggle(true, id, lang)
}

const _id = ref('')
const confirmRemove = (id) => {
  console.log(id)
  _id.value = id
  toggle.value = true
}

const remove = async (answer) => {
  if (answer) {
    await store.removeCategory(_id.value)
  }
  close()
}

const close = () => {
  toggle.value = false
}

// onMounted(() => {
//   getData()
// })
</script>
<style lang=""></style>
