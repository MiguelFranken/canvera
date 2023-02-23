<script setup lang="ts">
const { icon } = defineProps<{
  icon: string
}>()
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    <div class="h-8 w-8" :class="icon" aria-hidden="true" />
  </button>
</template>
