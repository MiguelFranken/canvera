import Konva from 'konva'
import { useCanvasStore } from '~/stores/canvas'

export const useBackground = () => {
  function addBackground(layer: Konva.Layer, color: string) {
    const { scale } = useCanvasStore()

    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: layer!.getWidth() * scale,
      height: layer!.getHeight() * scale,

      fill: color,

      // remove background from hit graph for better perf
      // because we don't need any events on the background
      listening: false,
    })

    layer.add(background)
  }

  return {
    addBackground,
  }
}
