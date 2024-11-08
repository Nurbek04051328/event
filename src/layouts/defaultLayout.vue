<template>
  <div class="h-screen">
    <asideDefault />
    <div class="lg:pl-72 flex flex-col h-full">
      <headerDefault />
      <main class="pb-10 flex-1 overflow-auto">
        <headPart />
        <div class="px-4 sm:px-6 lg:px-8">
          <routerView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import headPart from '@/components/default/headPart.vue'
import asideDefault from '@/components/default/asideDefault.vue'
import headerDefault from '@/components/default/headerDefault.vue'
</script>

<style lang="scss"></style>
