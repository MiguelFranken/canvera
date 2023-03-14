<script setup lang="ts">
import { useCollection, useCurrentUser, useFirestore } from 'vuefire'
import { collection, limit, orderBy, query } from 'firebase/firestore'
const db = useFirestore()

const user = useCurrentUser()

const authoredImages = useCollection(
  query(
    collection(db, `collection/${user.value!.uid}/authored`),
    orderBy('timestamp', 'desc'),
    limit(6),
  ),
  { ssrKey: 'authored' },
)

const receivedImages = useCollection(
  query(
    collection(db, `collection/${user.value!.uid}/received`),
    orderBy('timestamp', 'desc'),
    limit(6),
  ),
  { ssrKey: 'received' },
)
</script>

<template>
  <div class="space-y-12 p-6">
    <div>
      <div class="text-2xl leading-12 text-gray-900">
        Authored Images
      </div>
      <ul v-if="authoredImages.length > 0" class="grid gap-4 grid-cols-3">
        <li v-for="authoredImage in authoredImages" :key="authoredImage.src" class="border border-4 border-offset-0 border-indigo-600">
          <img :src="authoredImage.src" alt="Encoded Canvas Image">
        </li>
      </ul>
      <div v-else class="text-sm text-gray-400">
        No authored images yet
      </div>
    </div>

    <div>
      <h2 class="text-2xl leading-12 text-gray-900">
        Received Images
      </h2>
      <ul v-if="receivedImages.length > 0" class="grid gap-4 grid-cols-3">
        <li v-for="receivedImage in receivedImages" :key="receivedImage.src" class="border border-4 border-offset-0 border-indigo-600">
          <img :src="receivedImage.src" alt="Encoded Canvas Image">
        </li>
      </ul>
      <div v-else class="text-sm text-gray-400">
        No received images yet
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: default
  title: Collection
</route>
