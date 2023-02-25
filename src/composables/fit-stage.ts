import type Konva from 'konva'

export const useFitStage = (stage: Konva.Stage, container: HTMLElement, sceneWidth: number) => {
  // we need to fit stage into parent container
  const containerWidth = ref(container.offsetWidth ?? 0)

  const scale = computed(() => containerWidth.value / sceneWidth)
  const scaleInverted = computed(() => 1 / scale.value)

  function fitStageIntoParentContainer() {
    containerWidth.value = container.offsetWidth ?? 0
    stage.width(sceneWidth * scale.value)
    stage.height(sceneWidth * scale.value)
    stage.scale({ x: scale.value, y: scale.value })
  }

  fitStageIntoParentContainer()
  useEventListener(window, 'resize', fitStageIntoParentContainer)

  return {
    scale: scaleInverted,
  }
}
