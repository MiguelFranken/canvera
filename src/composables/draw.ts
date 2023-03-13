import type Konva from 'konva'
import { storeToRefs } from 'pinia'
import { Observable } from 'rxjs'
import { DrawLineCommand } from '~/commands/draw.command'

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

        const onMouseMove = () => {
          const nextPos = stage.value?.getPointerPosition()
          if (nextPos) {
            subscriber.next({
              x: nextPos.x * scale.value,
              y: nextPos.y * scale.value,
            })
          }
        }

        // push subsequent positions
        stage.value?.on('mousemove.draw touchmove.draw', onMouseMove)

        // handle end of drawing
        stage.value?.on('mouseup.draw touchend.draw', () => {
          subscriber.complete()
          stage.value?.off('mousemove.draw touchmove.draw')
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
