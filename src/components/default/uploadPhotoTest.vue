<template>
  <div class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</div>
  <div class="mt-2">
    <label type="button" label="photo" for="photo"
      class="relative w-full rounded-lg flex-col border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-3 justify-center">
      <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
        <PaperClipIcon class="size-6 text-gray-400" />
        <span class="text-sm font-medium text-blue-500">{{ placeholder }}</span>
      </div>

      <div v-if="model" class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
        <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
          <img :src="`${url}/${model}`" alt=""
            class="flex-grow-0 flex-shrink-0 w-14 h-14 relative rounded bg-gray-200" />

          <div class="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
            <p class="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-gray-900">
              {{ image }}
            </p>
            <p class="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-gray-400">
              ({{ size.toFixed(4) }} МБ)
            </p>
          </div>
        </div>
        <button type="button" @click="removePhoto">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="flex-grow-0 flex-shrink-0 w-5 h-5 relative" preserveAspectRatio="xMidYMid meet">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM7 9C6.73478 9 6.48043 9.10536 6.29289 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H7Z"
              fill="#DC2626"></path>
          </svg>
        </button>
      </div>
    </label>
    <input type="file" accept="image/*" name="" id="photo" class="hidden" ref="fileinput" @change="onFileChange" />
  </div>
</template>
<script setup>
import { PaperClipIcon } from '@heroicons/vue/24/solid'

import axios from 'axios'
import { getCookie } from 'typescript-cookie'
import { ref } from 'vue'
const url = import.meta.env.VITE_URL;
const model = defineModel();
const props = defineProps(['label', 'placeholder', 'base_url']);
const image = ref('');
const size = ref(0);
const base_url = props.base_url

const onFileChange = (event) => {
  const file = event.target?.files[0]
  if (file) {
    console.log(file)
    size.value = file.size / 1024 / 1024
    image.value = file.name
    uploadFile(file)
  }
}



const removePhoto = async () => {
  console.log({
    filePath: model.value
  })

  await axios.delete(`${url}/file/category`, {
    headers: {
      Authorization: `Bearer ${getCookie('lavita-token')}`,
      'Content-type': 'application/json'
    },
    data: {
      filePath: model.value
    }
  })
  model.value = ''
}

const uploadFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    console.log(file)

    const response = await axios.post(`${url}/${base_url}`, formData, {
      headers: {
        Authorization: `Bearer ${getCookie('lavita-token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status == 201) {
      console.log(response.data?.file)
      model.value = response.data?.file
    }
  } catch (error) {
    console.log(error)
  }
}


</script>
<style lang=""></style>
