<script setup lang="ts">
import { useCanvasStore } from '~/stores/canvas'
import ToolbarButton from '~/components/patterns/button/ToolbarButton.vue'

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

const { setPencilMode, resetCanvas } = useCanvasStore()

function handlePencilClick() {
  setPencilMode('brush')
}

function handleEraserClick() {
  setPencilMode('eraser')
}

function handleResetClick() {
  resetCanvas()
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-4">
      <ToolbarButton icon="i-ph-pencil-fill" @click="handlePencilClick" />
      <ToolbarButton icon="i-ph-eraser-fill" @click="handleEraserClick" />
      <ToolbarButton icon="i-ph-trash" @click="handleResetClick" />
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
