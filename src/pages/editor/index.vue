<script setup lang="ts">
import type Konva from 'konva'

defineOptions({
  name: 'EditorPage',
})

const router = useRouter()
const { t } = useI18n()

const width = 500
const height = 500

const configKonva = ref({
  width,
  height,
})

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

const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
  dragItemId.value = null
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-16">
      <div class="text-4xl text-center">
        <div>Canvera Editor</div>
      </div>

      <div class="flex items-center justify-center">
        <div class="rounded-xl outline outline-8 outline-offset-0 outline-blue-500">
          <v-stage
            :config="configKonva"
            @dragstart="onDragStart"
            @dragend="onDragEnd"
          >
            <v-layer>
              <v-star
                v-for="item in list"
                :key="item.id"
                :config="{
                  x: item.x,
                  y: item.y,
                  rotation: item.rotation,
                  id: item.id,
                  numPoints: 5,
                  innerRadius: 30,
                  outerRadius: 50,
                  fill: '#89b717',
                  opacity: 0.8,
                  draggable: true,
                  scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                  scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                  shadowColor: 'black',
                  shadowBlur: 10,
                  shadowOffsetX: dragItemId === item.id ? 15 : 5,
                  shadowOffsetY: dragItemId === item.id ? 15 : 5,
                  shadowOpacity: 0.6,
                }"
              />
            </v-layer>
          </v-stage>
        </div>
      </div>

      <div>
        <button
          btn m="3 t6" text-sm
          @click="router.back()"
        >
          {{ t('button.back') }}
        </button>
      </div>
    </div>
  </div>
</template>