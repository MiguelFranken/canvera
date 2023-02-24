<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '~/stores/canvas'
import { useToolbarStore } from '~/stores/toolbar'

const { mode } = storeToRefs(useToolbarStore())

const { resetCanvas } = useCanvasStore()
const { setPencilMode } = useToolbarStore()

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
  <div class="flex gap-4">
    <ToolbarButton :active="mode === 'brush'" icon="i-ph-pencil-fill" @click="handlePencilClick" />
    <ToolbarButton :active="mode === 'eraser'" icon="i-ph-eraser-fill" @click="handleEraserClick" />
    <ToolbarButton icon="i-ph-trash" @click="handleResetClick" />
  </div>
</template>
