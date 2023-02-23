import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { useCanvasStore } from '~/stores/canvas'

export const useFitStage = (container: Ref<HTMLElement | null>, sceneWidth: number) => {
  const { stage } = storeToRefs(useCanvasStore())

  function fitStageIntoParentContainer() {
    if (container.value && stage.value) {
      // we need to fit stage into parent container
      const containerWidth = container.value.offsetWidth

      // we make the full scene visible,
      // so we need to scale all objects on canvas
      const scale = containerWidth / sceneWidth

      stage.value.width(sceneWidth * scale)
      stage.value.height(sceneWidth * scale)
      stage.value.scale({ x: scale, y: scale })
    }
  }

  // initial fit
  onMounted(() => {
    fitStageIntoParentContainer()
  })

  useEventListener(window, 'resize', fitStageIntoParentContainer)

  return {}
}
