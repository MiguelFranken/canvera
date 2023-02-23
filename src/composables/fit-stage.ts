import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { useCanvasStore } from '~/stores/canvas'

export const useFitStage = (container: Ref<HTMLElement | null>, sceneWidth: number) => {
  const { stage } = storeToRefs(useCanvasStore())

  // we need to fit stage into parent container
  const containerWidth = ref(container.value?.offsetWidth ?? 0)

  const scale = computed(() => containerWidth.value / sceneWidth)
  const scaleInverted = computed(() => 1 / scale.value)

  function fitStageIntoParentContainer() {
    containerWidth.value = container.value?.offsetWidth ?? 0

    if (container.value && stage.value) {
      stage.value.width(sceneWidth * scale.value)
      stage.value.height(sceneWidth * scale.value)
      stage.value.scale({ x: scale.value, y: scale.value })
    }
  }

  // initial fit
  onMounted(() => {
    fitStageIntoParentContainer()
  })

  useEventListener(window, 'resize', fitStageIntoParentContainer)

  return {
    scale: scaleInverted,
  }
}
