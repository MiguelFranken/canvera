<script setup lang="ts">
import { useCurrentUser, useFirestore } from 'vuefire'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useCanvasStore } from '~/stores/canvas'
import ReceiverListbox from '~/components/ReceiverListbox.vue'

defineOptions({
  name: 'EditorPage',
})

const router = useRouter()
const { t } = useI18n()

const { encodeCanvasAsImage } = useCanvasStore()

const encodedCanvasImage = ref<string | null>(null)
const onSaveImage = async () => {
  const encoded = await encodeCanvasAsImage()
  encodedCanvasImage.value = encoded
}

const db = useFirestore()

const receiver = ref<string>('')

const onUploadImage = async () => {
  const encoded = await encodeCanvasAsImage()
  const user = useCurrentUser()

  try {
    await addDoc(collection(db, `collection/${user.value!.uid}/authored`), {
      src: encoded,
      timestamp: serverTimestamp(),
      receiver: receiver.value,
    })

    await addDoc(collection(db, `collection/${receiver.value}/received`), {
      src: encoded,
      timestamp: serverTimestamp(),
      author: user.value!.uid,
    })
  }
  catch (e) {
    console.error('Error adding document: ', e)
  }
}

const textModel = ref('')

const canvas = useCanvasStore()
const addTextToCanvas = async () => {
  canvas.addTextToCanvas(textModel.value)

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
      <template v-if="false">
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
      </template>

      <div class="space-y-8 m-8">
        <Editor />
        <Toolbar />
      </div>

      <div class="flex justify-center">
        <ReceiverListbox v-model="receiver" />
      </div>

      <div class="flex justify-center gap-16">
        <Button @click="onSaveImage">
          Save Image
        </Button>
        <Button @click="onUploadImage">
          Upload Image
        </Button>
      </div>

      <div v-if="encodedCanvasImage" class="flex flex-col gap-2 items-center">
        <div class="text-lg">
          Rendered Image
        </div>
        <div>
          <img :src="encodedCanvasImage" alt="Encoded Canvas Image">
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

<route lang="yaml">
meta:
  layout: default
  title: Editor
</route>
