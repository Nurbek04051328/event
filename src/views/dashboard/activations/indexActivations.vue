<template>
  <div class="py-4">
    <ActivationTable />
  </div>
</template>
<script setup>

import ActivationTable from '@/components/data/dashboard/activation/activationTable.vue';




import { activationStore } from '@/stores/data/activation';
import { onMounted } from 'vue';
const activation_store = activationStore();

onMounted(async () => {

  await activation_store.getActivations({ limit: 0 });
})
</script>
<style lang=""></style>