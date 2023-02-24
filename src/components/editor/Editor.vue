<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Konva from 'konva'
import { useCanvasStore } from '~/stores/canvas'
import { useStars } from '~/composables/stars'
import type { VueKonvaLayer, VueKonvaStage } from '~/types'
import { useDraw } from '~/composables/draw'

const sceneWidth = 1500
const sceneHeight = sceneWidth

// initialize canvas store
const configKonva = ref({
  sceneWidth,
  sceneHeight,
})
const stageRef = ref<VueKonvaStage | null>(null)
const { setStage } = useCanvasStore()
onMounted(() => {
  if (stageRef.value)
    setStage(stageRef.value.getNode())
})

const container = ref<HTMLElement | null>(null)

const { scale } = toRefs(useFitStage(container, sceneWidth))

const { handleMouseMove, handleMouseUp, handleMouseDown } = useDraw(scale)
</script>

<template>
  <div ref="container" class="outline outline-4 outline-offset-0 outline-indigo-600">
    <v-stage
      ref="stageRef"
      :config="configKonva"
      @mousemove="handleMouseMove"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    />
  </div>
</template>
