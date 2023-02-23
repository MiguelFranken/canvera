<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '~/stores/canvas'
import ToolbarButton from '~/components/patterns/button/ToolbarButton.vue'

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

const { setPencilMode, resetCanvas, setPencilColor } = useCanvasStore()
const { mode } = storeToRefs(useCanvasStore())

function handlePencilClick() {
  setPencilMode('brush')
}

function handleEraserClick() {
  setPencilMode('eraser')
}

function handleResetClick() {
  resetCanvas()
}

function HandlePencilColorClick(color: string) {
  setPencilColor(color)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex gap-4">
      <ToolbarButton :active="mode === 'brush'" icon="i-ph-pencil-fill" @click="handlePencilClick" />
      <ToolbarButton :active="mode === 'eraser'" icon="i-ph-eraser-fill" @click="handleEraserClick" />
      <ToolbarButton icon="i-ph-trash" @click="handleResetClick" />
    </div>
    <div v-if="mode === 'brush'" class="flex gap-4 max-w-full overflow-x-auto snap-x pb-4">
      <div
        v-for="color in colors"
        :key="color.code"
        :style="{ backgroundColor: color.code }"
        class="rounded-md w-14 h-14 border-4 shrink-0 snap-center" @click="HandlePencilColorClick(color.code)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
