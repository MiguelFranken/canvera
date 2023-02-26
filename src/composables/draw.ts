import Konva from 'konva'
import { storeToRefs } from 'pinia'

export const useDraw = () => {
  const isPaint = ref(false)
  const lastLine = ref<Konva.Line | null>(null)

  const { stage, layer, scale } = storeToRefs(useCanvasStore())
  const { color, mode } = storeToRefs(useToolbarStore())

  function handleMouseDown() {
    isPaint.value = true
    const pos = stage.value?.getPointerPosition()

    if (pos) {
      const line = new Konva.Line({
        stroke: color.value,
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
      const [prevX, prevY] = [
        lastLine.value!.points()[lastLine.value!.points().length - 2]!,
        lastLine.value!.points()[lastLine.value!.points().length - 1]!,
      ]
      const newPosition = [
        pos.x * scale.value,
        pos.y * scale.value,
      ]
      let newPoints: number[] = []

      let dx = newPosition[0] - prevX
      let dy = newPosition[1] - prevY
      const dist = Math.max(Math.abs(dx), Math.abs(dy))

      // drawing always generates little artifacts
      if (dist <= 10)
        return

      dx = dx / dist
      dy = dy / dist

      let x = prevX
      let y = prevY

      // interpolate between previous point and current point to draw
      for (let d = 0; d < dist; d += 5) {
        newPoints = newPoints.concat([x, y])

        x += dx
        y += dy
      }

      const updatedPoints = lastLine.value?.points().concat(newPoints)
      if (updatedPoints)
        lastLine.value?.points(updatedPoints)
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
