<script setup lang="ts">
interface Color {
  code: string
}

const colors: Color[] = [
  {
    code: 'red',
  },
  {
    code: 'green',
  },
  {
    code: 'blue',
  },
]
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-4">
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div class="h-8 w-8 i-ph-pencil-fill" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div class="h-8 w-8 i-ph-eraser-fill" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div class="h-8 w-8 i-ph-trash" aria-hidden="true" />
      </button>
    </div>
    <div v-if="false" class="flex gap-8 justify-center">
      <div
        v-for="color in colors"
        :key="color.code"
        :style="{ backgroundColor: color.code }" class="rounded-full w-12 h-12 border-4"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
