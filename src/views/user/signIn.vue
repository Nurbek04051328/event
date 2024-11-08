<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm"></div>

    <div class="mt-10 mx-auto w-full max-w-64">
      <form @submit.prevent="submit" class="space-y-3">
        <div>
          <label for="login" class="block text-sm font-medium leading-6 text-gray-900">Логин</label>
          <div class="mt-2">
            <input
              id="login"
              name="login"
              type="login"
              v-model="user.login"
              placeholder=""
              autocomplete="off"
              class="input-text"
              :class="{
                'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500':
                  v$.login.$invalid && v$.login.$dirty
              }"
            />
          </div>
          <span v-if="v$.login.$invalid && v$.login.$dirty">
            <p class="mt-2 text-xs text-red-600" id="email-error">Обезательная поля</p>
          </span>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Парол</label
            >
          </div>

          <div class="mt-2 flex rounded-md">
            <div class="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                id="password"
                name="password"
                :type="toggle ? 'text' : 'password'"
                v-model="user.password"
                autocomplete="current-password"
                class="input-text"
                aria-invalid="true"
                :class="{
                  'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500':
                    v$.password.$invalid && v$.password.$dirty
                }"
              />

              <button
                type="button"
                @click="toggle = !toggle"
                class="absolute right-0 inline-flex p-2"
              >
                <EyeIcon v-if="!toggle" class="size-5 text-gray-400" />
                <EyeSlashIcon v-else class="size-5 text-gray-400" />
              </button>
            </div>
          </div>
          <span v-if="v$.password.$invalid && v$.password.$dirty">
            <p class="mt-2 text-xs text-red-600" id="email-error">Обезательная поля</p>
          </span>
        </div>

        <div>
          <button type="submit" class="primary-btn">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { authStore } from '@/stores/user/auth'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  login: { required },
  password: { required }
}

const store = authStore()
const toggle = ref(false)

const user = ref({
  login: '',
  password: ''
})

const v$ = useVuelidate(rules, user)

const submit = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    await store.login(user.value)
  }
}
</script>
<style lang=""></style>
