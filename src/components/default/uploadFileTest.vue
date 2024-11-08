<template>
  <div class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</div>
  <label v-if="!model" type="button" label="photo" for="photo"
    class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2">
    <div
      class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 p-2 rounded bg-blue-100">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0 w-5 h-5 relative" preserveAspectRatio="xMidYMid meet">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V7.414C15.9999 6.88361 15.7891 6.37499 15.414 6L12 2.586C11.625 2.2109 11.1164 2.00011 10.586 2H6ZM11 8C11 7.73478 10.8946 7.48043 10.7071 7.29289C10.5196 7.10536 10.2652 7 10 7C9.73478 7 9.48043 7.10536 9.29289 7.29289C9.10536 7.48043 9 7.73478 9 8V10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12H9V14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V12H13C13.2652 12 13.5196 11.8946 13.7071 11.7071C13.8946 11.5196 14 11.2652 14 11C14 10.7348 13.8946 10.4804 13.7071 10.2929C13.5196 10.1054 13.2652 10 13 10H11V8Z"
          fill="#1D4ED8"></path>
      </svg>
    </div>
    <div class="flex flex-col justify-center items-start flex-grow relative">
      <p class="self-stretch flex-grow-0 flex-shrink-0 w-[344px] text-sm text-left text-gray-900">
        Выберите файл
      </p>
      <p class="self-stretch flex-grow-0 flex-shrink-0 w-[344px] text-xs text-left text-gray-400">
        PDF, .exc, jpeg, jpg, png, doc, docx
      </p>
    </div>
  </label>
  <div v-if="model" class="flex flex-col gap-3 justify-start items-start mt-2 relative">
    <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5"
      v-for="(doc, index) of model" :key="index">
      <img :src="`${url}/${doc}`" alt="" class="flex-grow-0 flex-shrink-0 w-9 h-9 relative rounded bg-gray-200" />

      <div class="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1 text-xs">
        <p class="flex-grow-0 flex-shrink-0 font-medium text-left text-gray-900">
          {{ doc.split('files/product/').join('') }}
        </p>
        <button type="button" @click="removePhoto(index)" class="text-red-600">
          Удалить товар
        </button>
      </div>
    </div>
    <label type="button" label="photo" for="photo"
      class="flex justify-center items-center relative overflow-hidden gap-1 px-[11px] text-blue-600 hover:bg-blue-600 hover:text-white white-invert fill-blue-600 py-[7px] rounded bg-blue-100 text-xs font-medium text-left">

      <p class="flex-grow-0 flex-shrink-0">Добавить ещё</p>
    </label>
  </div>

  <input type="file" name="" id="photo" class="hidden" ref="fileinput" @change="onFileChange" />
</template>
<script setup>
import axios from 'axios'
import { getCookie } from 'typescript-cookie'
import { ref } from 'vue'
const url = import.meta.env.VITE_URL
const model = defineModel()
defineProps(['label', 'placeholder'])
const image = ref('')
const size = ref(0)

// const filename = (url) => {
//   let arr = url.split('files/product/').join('').split('.')

//   return {
//     name: arr.slice(0, arr.length - 1).join('.'),
//     ext: arr.slice(arr.length - 1).toString()
//   }
// }

const onFileChange = (event) => {
  const file = event.target?.files[0]
  if (file) {
    console.log(file)
    size.value = file.size / 1024 / 1024
    image.value = file.name
    uploadFile(file)
  }
}

const removePhoto = async (index) => {
  if (model.value) {
    await axios.delete(`${url}/file`, {
      headers: {
        Authorization: `Bearer ${getCookie('lavita-token')}`,
        'Content-type': 'application/json'
      },
      data: {
        filePath: model.value[index]
      }
    })
    model.value.splice(index, 1)
  }
}

const uploadFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(`${url}/product/upload`, formData, {
      headers: {
        Authorization: `Bearer ${getCookie('lavita-token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status == 201) {
      console.log(response.data?.file, model.value)
      if (model.value) {
        model.value.push(response.data?.file)
      } else {
        model.value = [response.data?.file]
      }
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang=""></style>
