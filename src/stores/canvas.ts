import { acceptHMRUpdate, defineStore } from 'pinia'
import Konva from 'konva'

type Mode = 'brush' | 'eraser'

export const useCanvasStore = defineStore('canvas', () => {
  const stage = ref<Konva.Stage | null>(null)
  const mode = ref<Mode>('brush')
  const color = ref<string>('red')

  const layer = ref<Konva.Layer | null>(null)

  function setStage(s: Konva.Stage) {
    stage.value = unref(s)
    const mainLayer = new Konva.Layer()
    stage.value!.add(mainLayer)
    layer.value = mainLayer
  }

  async function encodeCanvasAsImage() {
    return await stage.value?.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0.8,
    }) ?? ''
  }

  function resetCanvas() {
    layer.value?.destroyChildren()
  }

  function addTextToCanvas(text: string) {
    const textNode = new Konva.Text({
      x: 10,
      y: 10,
      text,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'black',
    })
    layer.value?.add(textNode)
  }

  function setPencilMode(m: Mode) {
    mode.value = m
  }

  function setPencilColor(c: string) {
    color.value = c
  }

  return {
    stage,
    mode,
    color,
    layer,

    // mutations
    setStage,
    addTextToCanvas,
    setPencilMode,
    resetCanvas,
    setPencilColor,

    // getter
    encodeCanvasAsImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
