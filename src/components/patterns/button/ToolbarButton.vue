<script setup lang="ts">
const { icon } = withDefaults(defineProps<{
  icon: string
  active?: boolean
}>(), {
  active: false,
})
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center rounded-full border border-transparent p-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="{
      'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': active,
      'bg-gray-500 hover:bg-gray-700 focus:ring-gray-500': !active,
    }"
  >
    <div class="h-8 w-8" :class="icon" aria-hidden="true" />
  </button>
</template>
