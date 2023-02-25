import { acceptHMRUpdate, defineStore } from 'pinia'
import Konva from 'konva'
import { useBackground } from '~/composables/background'

export const useCanvasStore = defineStore('canvas', () => {
  const container = ref<HTMLDivElement | null>(null)

  // canvas
  const stage = ref<Konva.Stage | null>(null)
  const layer = ref<Konva.Layer | null>(null)
  const scale = ref(1)

  function initStage(stageContainer: HTMLDivElement) {
    container.value = stageContainer

    const sceneWidth = 1500
    const sceneHeight = sceneWidth

    // initialize canvas store
    const configKonva: Omit<Konva.StageConfig, 'container'> = {
      width: sceneWidth,
      height: sceneHeight,
    }

    const s = new Konva.Stage({
      container: stageContainer,
      ...configKonva,
    })

    stage.value = s

    const { scale: computedScale } = useFitStage(s, container.value, sceneWidth)
    watch(computedScale, (newScale) => {
      scale.value = newScale
    }, { immediate: true })

    initMainLayer()
    initDraw()
  }

  function initMainLayer() {
    const mainLayer = new Konva.Layer()
    stage.value!.add(mainLayer)
    layer.value = mainLayer

    useBackground().addBackground(mainLayer, 'white')
  }

  function initDraw() {
    const { handleMouseMove, handleMouseUp, handleMouseDown } = useDraw()
    stage.value?.on('mousedown touchstart', handleMouseDown)
    stage.value?.on('mousemove touchmove', handleMouseMove)
    stage.value?.on('mouseup touchend', handleMouseUp)
  }

  async function encodeCanvasAsImage() {
    return await stage.value?.toDataURL({
      mimeType: 'image/jpeg',
      quality: 1,
      pixelRatio: 3,
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

  return {
    stage,
    layer,
    scale,

    // mutations
    initStage,
    addTextToCanvas,
    resetCanvas,

    // getter
    encodeCanvasAsImage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
