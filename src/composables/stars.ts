import type Konva from 'konva'

export const useStars = (width: number, height: number) => {
  const list = ref<{
    id: string
    x: number
    y: number
    rotation: number
    scale: number
  }[]>([])

  for (let n = 0; n < 30; n++) {
    list.value.push({
      id: Math.round(Math.random() * 10000).toString(),
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: Math.random() * 180,
      scale: Math.random(),
    })
  }

  const dragItemId = ref<string | null>(null)

  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    dragItemId.value = e.target.id()
    // move current element to the top:
    const item = list.value.find(i => i.id === dragItemId.value)
    if (item == null)
      return
    const index = list.value.indexOf(item)
    list.value.splice(index, 1)
    list.value.push(item)
  }

  const onDragEnd = () => {
    dragItemId.value = null
  }

  return {
    list,
    dragItemId,
    onDragStart,
    onDragEnd,
  }
}
