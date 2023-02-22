<script setup lang="ts">
import type Konva from 'konva'

import { useFirestore } from 'vuefire'
import { doc, updateDoc } from 'firebase/firestore'

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

const stage = ref<Konva.Stage | null>(null)

const encondedCanvasImage = ref<string | null>(null)

const onSaveImage = () => {
  console.log(stage.value?.getStage())
  stage.value?.getStage().toDataURL({
    mimeType: 'image/jpeg',
    quality: 0.8,
    callback: (dataUrl) => {
      encondedCanvasImage.value = dataUrl
      console.log(dataUrl)
    },
  })
}

const textModel = ref('')
const texts = ref<string[]>([])

const db = useFirestore()

const addTextToCanvas = async () => {
  texts.value.push(textModel.value)

  const document = doc(db, 'todos', 'luna').withConverter({
    toFirestore: (todo: any) => {
      return {
        text: todo.text,
      }
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)
      return new Todo(data.text)
    },
  })

  try {
    await updateDoc(document, {
      text: textModel.value,
    })
  }
  catch (e) {
    console.error('Error updating document: ', e)
  }

  textModel.value = ''
}

class Todo {
  text: string

  constructor(text: string) {
    this.text = text
  }

  toString() {
    return `${this.text}`
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-16">
      <div class="text-4xl text-center">
        <div>Canvera Editor</div>
      </div>

      <div class="flex justify-center">
        <div class="w-128 text-center">
          <!-- Input Field -->
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700 text-left text-lg">About</label>
            <div class="mt-1">
              <textarea
                id="about"
                v-model="textModel"
                name="about"
                rows="3"
                class="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500 text-left">
              Write a few sentences for your friend.
            </p>
          </div>

          <div class="flex justify-end">
            <Button @click="addTextToCanvas">
              Add text to canvas
            </Button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div class="rounded-xl outline outline-8 outline-offset-0 outline-blue-500">
          <v-stage
            ref="stage"
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
              <v-text
                v-for="text in texts"
                :key="text"
                :config="{
                  text,
                  fontSize: 25,
                  draggable: true,
                  fill: 'red',
                }"
              />
            </v-layer>
          </v-stage>
        </div>
      </div>

      <div class="flex justify-center">
        <Button @click="onSaveImage">
          Save Image
        </Button>
      </div>

      <div v-if="encondedCanvasImage" class="flex flex-col gap-2 items-center">
        <div class="text-lg">
          Rendered Image
        </div>
        <div>
          <img :src="encondedCanvasImage" alt="Encoded Canvas Image">
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
