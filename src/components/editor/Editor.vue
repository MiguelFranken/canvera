<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '~/stores/canvas'
import { useStars } from '~/composables/stars'
import type { VueKonvaStage } from '~/types'

const sceneWidth = 1000
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

useFitStage(container, sceneWidth)

const stars = useStars(sceneWidth, sceneHeight)
const { list, dragItemId } = toRefs(stars)
const { onDragStart, onDragEnd } = stars

const stage = computed(() => stageRef.value?.getNode())

const { texts } = storeToRefs(useCanvasStore())

const position = ref({ x: 0, y: 0 })

function handleMouseMove() {
  const mousePos = stage.value?.getRelativePointerPosition()
  if (mousePos) {
    const x = mousePos.x - 190
    const y = mousePos.y - 40
    position.value = { x, y }
  }
}
</script>

<template>
  <div class="text-center">
    {{ position }}
  </div>
  <div ref="container" class="outline outline-8 outline-offset-0 outline-blue-500 m-16">
    <v-stage
      ref="stageRef"
      :config="configKonva"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @mousemove="handleMouseMove"
    >
      <v-layer>
        <v-star
          v-for="item in list"
          :key="item.id"
          :config="{
            x: item.x,
            y: item.y,
            rotation: item.rotation,
            id: item.id,
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 50,
            fill: '#89b717',
            opacity: 0.8,
            draggable: true,
            scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
            scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: dragItemId === item.id ? 15 : 5,
            shadowOffsetY: dragItemId === item.id ? 15 : 5,
            shadowOpacity: 0.6,
          }"
        />
        <v-text
          v-for="text in texts"
          :key="text"
          :config="{
            text,
            fontSize: 25,
            draggable: true,
            fill: 'red',
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>
