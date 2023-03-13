<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '~/stores/canvas'
import { useToolbarStore } from '~/stores/toolbar'

const { mode } = storeToRefs(useToolbarStore())
const { resetCanvas } = useCanvasStore()
const { setPencilMode } = useToolbarStore()
const commandStore = useCommandStore()
const { canUndo } = storeToRefs(commandStore)
const { undo } = commandStore
</script>

<template>
  <div class="flex gap-4">
    <ToolbarButton :active="mode === 'brush'" icon="i-ph-pencil-fill" @click="setPencilMode('brush')" />
    <ToolbarButton :active="mode === 'eraser'" icon="i-ph-eraser-fill" @click="setPencilMode('eraser')" />
    <ToolbarButton icon="i-ph-trash" @click="resetCanvas" />
    <ToolbarButton v-if="canUndo" icon="i-ph-arrow-arc-left" @click="undo" />
  </div>
</template>
