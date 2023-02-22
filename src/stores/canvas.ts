import { acceptHMRUpdate, defineStore } from 'pinia'
import type Konva from 'konva'

export const useCanvasStore = defineStore('canvas', () => {
  const stage = ref<Konva.Stage | null>(null)
  const texts = ref<string[]>([])

  function setStage(s: Konva.Stage) {
    stage.value = unref(s)
  }

  async function encodeCanvasAsImage() {
    return await stage.value?.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0.8,
    }) ?? ''
  }

  function addTextToCanvas(text: string) {
    texts.value.push(text)
  }

  return {
    texts,

    // mutations
    setStage,
    addTextToCanvas,

    // getter
    encodeCanvasAsImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
