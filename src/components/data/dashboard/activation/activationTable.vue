<template>
  <div class="-mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">

    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first">№</th>
          <th scope="col" class="th">Key</th>
          <th scope="col" class="th">Email</th>
          <th scope="col" class="th">Foydalanuvchi</th>
          <th scope="col" class="th" width="150">Vaqti</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, itemIdx) in activations" :key="item._id" :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'">
          <td class="td-first">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">{{ item.key || '' }}</td>
          <td class="td">{{ item.email || '' }}</td>
          <td class="td">{{ item.user.lname || ''}} {{ item.user.name || ''}}</td>
          <td class="td">{{ convertDate(item.createdAt, 'full') }}</td>
          
        </tr>
      </tbody>
    </table>
  </div>

</template>
<script setup>

import { convertDate } from '@/helpers/func'
// import { TrashIcon } from '@heroicons/vue/24/outline'




import { activationStore } from '@/stores/data/activation';
import { storeToRefs } from 'pinia'
const store = activationStore();
const { activations } = storeToRefs(store);

// const getData = async () => {
//   await store.getCategories({
//     limit: limit.value
//   })
// }








// onMounted(() => {
//   getData()
// })
</script>
<style lang=""></style>