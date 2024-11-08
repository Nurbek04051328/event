<template>
  <div class="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first"></th>
          <th scope="col" class="th">Til nomi</th>
          <th scope="col" class="th">Qisqa ko'rinishi</th>
          <th scope="col" class="th">Odatiy tanlov</th>
          <th scope="col" class="th">Sana</th>
          <th scope="col" class="th-last"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, itemIdx) in languages" :key="item._id" :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'">
          <td class="td-first">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">{{ item.title }}</td>
          <td class="td">{{ item.slug }}</td>
          <td class="td">
            <defaultCheckbox v-model="item.isDefault" @click="changeIsDefault(item._id, item.isDefault)" />
          </td>
          <td class="td">{{ convertDate(item.createdAt, 'full') }}</td>
          <td class="td-last">
            <div class="flex gap-4">
              <button type="button" class="edit-btn size-10 ml-auto" @click="edit(item._id)">
                <PencilIcon class="size-5" />
              </button>
              <button type="button" class="danger-btn size-10" @click="confirmRemove(item._id)">
                <TrashIcon class="size-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialogModal title="Tilni o'chirmoqchimisiz?" btnTitle="Ha, o'chirilsin" @answer="remove" :dialog="toggle" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { convertDate } from '@/helpers/func'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'

const toggle = ref(false)
const limit = ref(30)

import { languageStore } from '@/stores/data/language'
const store = languageStore()
const { languages } = storeToRefs(store)

const changeIsDefault = async (_id) => {
  await store.changeIsDefault(_id)
}

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()

const edit = (id) => {
  usefull.setToggle(true, id)
}

const getData = async () => {
  await store.getlanguages({
    limit: limit.value
  })
}

const _id = ref('')
const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
}

const remove = async (answer) => {
  if (answer) {
    await store.removelanguage(_id.value)
  }
  close()
}
const close = () => {
  toggle.value = false
}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
