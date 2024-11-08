<template>
  <div class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</div>
  <div class="mt-2">
    <label type="button" label="file" for="file"
      class="relative w-full rounded-lg flex-col border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-3 justify-center">
      <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
        <PaperClipIcon class="size-6 text-gray-400" />
        <span class="text-sm font-medium text-blue-500">{{ placeholder }}</span>
      </div>

      <div v-if="files.length" class="flex flex-col gap-2">
        <div v-for="(file, index) in files" :key="index" class="flex justify-between gap-4 items-center flex-1">

          <p class="text-sm font-medium text-gray-900">{{ file?.name }}</p>
          <p class="text-xs font-medium text-gray-400">({{ file?.size?.toFixed(4) }} МБ)</p>

          <button type="button" @click.stop="removeFile(index)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM7 9C6.73478 9 6.48043 9.10536 6.29289 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H7Z"
                fill="#DC2626"></path>
            </svg>
          </button>
        </div>
      </div>
    </label>
    <input type="file" accept="file/*" name="file" id="file" multiple class="hidden" ref="fileinput"
      @change="onFileChange" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { getCookie } from 'typescript-cookie';


const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: Array,
  base_url: String
})
const emit = defineEmits(['update:modelValue']);
const files = ref([]);
const base_url = props.base_url;

import api from '@/helpers/api';

watch(() => props.modelValue, (newVal) => {
  files.value = [...newVal];
}, { immediate: true });

const onFileChange = (event) => {
  const files = event.target?.files;
  if (files) {
    Array.from(files).forEach(file => {
      const data = {
        name: file.name,
        size: file.size / 1024 / 1024,
      };
      uploadFile(file, data);
    });
  }
}


const removeFile = (index) => {
  files.value.splice(index, 1);
  emit('update:modelValue', files.value);
}

const uploadFile = async (file, data) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`${base_url}`, formData, {
      headers: {
        Authorization: `Bearer ${getCookie('lavita-token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.status == 200) {
      data.path = response.data;
      files.value.push(data);
      emit('update:modelValue', files.value);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>