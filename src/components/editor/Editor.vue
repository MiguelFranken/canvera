<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Konva from 'konva'
import { useCanvasStore } from '~/stores/canvas'
import { useStars } from '~/composables/stars'
import type { VueKonvaLayer, VueKonvaStage } from '~/types'

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

const { scale } = toRefs(useFitStage(container, sceneWidth))

const stars = useStars(sceneWidth, sceneHeight)
const { list, dragItemId } = toRefs(stars)
const { onDragStart, onDragEnd } = stars

const stage = computed(() => stageRef.value?.getNode())

const { texts } = storeToRefs(useCanvasStore())

const isPaint = ref(false)
const lastLine = ref<Konva.Line | null>(null)
const mode = ref('brush')

const layerRef = ref<VueKonvaLayer | null>(null)
const layer = computed(() => layerRef.value?.getNode())

function handleMouseDown() {
  isPaint.value = true
  const pos = stage.value?.getPointerPosition()

  if (pos) {
    const line = new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation:
        mode.value === 'brush' ? 'source-over' : 'destination-out',
      // round cap for smoother lines
      lineCap: 'round',
      lineJoin: 'round',
      // add point twice, so we have some drawings even on a simple click
      points: [pos.x * scale.value, pos.y * scale.value, pos.x * scale.value, pos.y * scale.value],
    })
    lastLine.value = line
    layer.value?.add(line)
  }
}

function handleMouseMove(e: Konva.KonvaEventObject<MouseEvent>) {
  if (!isPaint.value)
    return

  // prevent scrolling on touch devices
  e.evt.preventDefault()

  const pos = stage.value?.getPointerPosition()
  if (pos) {
    const newPoints = lastLine.value?.points().concat([pos.x * scale.value, pos.y * scale.value])
    if (newPoints)
      lastLine.value?.points(newPoints)
  }
}

function handleMouseUp() {
  isPaint.value = false
}
</script>

<template>
  <div ref="container" class="outline outline-4 outline-offset-0 outline-indigo-600 m-8">
    <v-stage
      ref="stageRef"
      :config="configKonva"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @mousemove="handleMouseMove"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <v-layer ref="layerRef">
        <template v-if="false">
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
        </template>
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
