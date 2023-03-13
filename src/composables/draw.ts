import type Konva from 'konva'
import { storeToRefs } from 'pinia'
import { Observable } from 'rxjs'
import { DrawLineCommand } from '~/composables/draw.command'

export const useDraw = () => {
  const { stage, layer, scale } = storeToRefs(useCanvasStore())
  const { color, mode } = storeToRefs(useToolbarStore())

  function handleMouseDown() {
    const pos = stage.value?.getPointerPosition()

    if (pos) {
      const observable = new Observable<Konva.Vector2d>((subscriber) => {
        // push initial position
        subscriber.next({
          x: pos.x * scale.value,
          y: pos.y * scale.value,
        })

        // push subsequent positions
        stage.value?.on('mousemove touchmove', () => {
          const nextPos = stage.value?.getPointerPosition()
          if (nextPos) {
            subscriber.next({
              x: nextPos.x * scale.value,
              y: nextPos.y * scale.value,
            })
          }
        })

        // handle end of drawing
        stage.value?.on('mouseup touchend', () => {
          subscriber.complete()
        })
      })

      const { execute } = useCommandStore()
      execute(new DrawLineCommand(layer.value as Konva.Layer, observable, color.value, mode.value))
    }
  }

  function init() {
    stage.value?.on('mousedown touchstart', handleMouseDown)
  }

  return {
    init,
  }
}
