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
  <div class="flex gap-8 justify-center">
    <div
      v-for="color in colors"
      :key="color.code"
      :style="{ backgroundColor: color.code }" class="rounded-full w-12 h-12 border-4"
    />
  </div>
</template>

<style lang="scss" scoped></style>
