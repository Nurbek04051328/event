<template>
  <div class="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first"></th>
          <th scope="col" class="th">Viloyat nomi</th>
          <th scope="col" class="th">Davlat nomi</th>
          <th scope="col" class="th">Tarjimalar</th>
          <th scope="col" class="th" width="150">Vaqti</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(item, itemIdx) in regions"
          :key="item._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">{{ item.translates?.at(0)?.title || '' }}</td>
          <td class="td">{{ item.country?.translates?.at(0)?.title || '' }}</td>
          <td class="td">
            <div class="flex items-start gap-2">
              <button
                @click="edit(item._id, lang._id)"
                :class="`${
                  item?.translates.some((tr) => tr.language == lang._id)
                    ? 'success-btn'
                    : 'edit-btn'
                } w-auto p-2 px-3`"
                v-for="lang of options?.languages"
                :key="lang._id"
              >
                {{ lang.slug }}
              </button>
            </div>
          </td>
          <td class="td">{{ convertDate(item.createdAt, 'full') }}</td>
          <td class="td-last">
            <button
              type="button"
              class="danger-btn size-10 ml-auto"
              @click="confirmRemove(item._id)"
            >
              <TrashIcon class="size-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialogModal
    title="Ma`lumotni o'chirmoqchimisiz?"
    btnTitle="Ha, o'chirilsin"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
defineProps(['options'])
import { convertDate } from '@/helpers/func'
import { TrashIcon } from '@heroicons/vue/24/outline'

const toggle = ref(false)
const limit = ref(30)

import { regionStore } from '@/stores/data/region'
const store = regionStore()
const { regions } = storeToRefs(store)

const getData = async () => {
  await store.getregions({
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
    await store.removeregion(_id.value)
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
