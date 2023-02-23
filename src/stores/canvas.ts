import { acceptHMRUpdate, defineStore } from 'pinia'
import type Konva from 'konva'

type Mode = 'brush' | 'eraser'

export const useCanvasStore = defineStore('canvas', () => {
  const stage = ref<Konva.Stage | null>(null)
  const texts = ref<string[]>([])
  const mode = ref<Mode>('brush')

  function setStage(s: Konva.Stage) {
    stage.value = unref(s)
  }

  async function encodeCanvasAsImage() {
    return await stage.value?.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0.8,
    }) ?? ''
  }

  function resetCanvas() {
    // stage.value?.destroyChildren()
    // stage.value?.clear()
  }

  function addTextToCanvas(text: string) {
    texts.value.push(text)
  }

  function setPencilMode(m: Mode) {
    mode.value = m
  }

  return {
    stage,
    texts,
    mode,

    // mutations
    setStage,
    addTextToCanvas,
    setPencilMode,
    resetCanvas,

    // getter
    encodeCanvasAsImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
