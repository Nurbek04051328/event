<template>
  <div :class="{
    'px-6 py-2': !nop
  }">
    <div :class="{
      'mb-5': !nop
    }">
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <router-link :to="tab.route" v-for="(tab, index) in list" :key="tab.name" :class="[
              route.query?.status == tab.value ||
                route?.name == tab.value ||
                (!nostatus && !route.query?.status && index == 0)
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-[1px] py-4 px-1 text-sm font-medium'
            ]" :aria-current="tab.current ? 'page' : undefined">{{ tab.title }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type Status } from '@/types/helper'
const route = useRoute()

type Props = {
  list: Status[]
  nop?: boolean,
  nostatus?: boolean
}

defineProps<Props>()
</script>
<style lang=""></style>
