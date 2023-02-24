<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'

interface Color {
  code: string
}

const colors: Color[] = [
  {
    code: '#f87171',
  },
  {
    code: '#fb923c',
  },
  {
    code: '#fbbf24',
  },
  {
    code: '#facc15',
  },
  {
    code: '#a3e635',
  },
  {
    code: '#4ade80',
  },
  {
    code: '#34d399',
  },
  {
    code: '#38bdf8',
  },
  {
    code: '#fbbf24',
  },
  {
    code: '#818cf8',
  },
  {
    code: '#f472b6',
  },
]

const { setPencilColor } = useToolbarStore()
const { color: activeColor } = storeToRefs(useToolbarStore())

function HandlePencilColorClick(color: string) {
  setPencilColor(color)
}
</script>

<template>
  <div class="flex gap-4 items-center max-w-full overflow-x-auto snap-x h-22">
    <div
      v-for="color in colors"
      :key="color.code"
      :style="{ backgroundColor: color.code }"
      class="rounded-md w-12 h-12 shrink-0 snap-center transition-all duration-300 ease-in-out"
      :class="{
        '': color.code !== activeColor,
        'border-4 border-gray-500 w-22 h-22': color.code === activeColor,
      }"
      @click="HandlePencilColorClick(color.code)"
    />
  </div>
</template>
