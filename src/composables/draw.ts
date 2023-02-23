import Konva from 'konva'
import { storeToRefs } from 'pinia'
import type { ComputedRef, Ref } from 'vue'

export const useDraw = (layer: ComputedRef<Konva.Layer | null>, scale: Ref<number>) => {
  const isPaint = ref(false)
  const lastLine = ref<Konva.Line | null>(null)
  const mode = ref('brush')

  const { stage } = storeToRefs(useCanvasStore())

  function handleMouseDown() {
    isPaint.value = true
    const pos = stage.value?.getPointerPosition()

    if (pos) {
      const line = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: 30,
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

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
