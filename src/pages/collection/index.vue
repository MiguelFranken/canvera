<script setup lang="ts">
import { useCollection, useCurrentUser, useFirestore } from 'vuefire'
import { collection, limit, orderBy, query } from 'firebase/firestore'
const db = useFirestore()

const q = query(
  collection(db, 'images'),
  orderBy('timestamp', 'desc'),
  limit(3),
)

const images = useCollection(q, { ssrKey: 'my-quiz' })

const user = useCurrentUser()

const authoredImages = useCollection(
  query(
    collection(db, `collection/${user.value!.uid}/authored`),
    orderBy('timestamp', 'desc'),
    limit(3),
  ),
  { ssrKey: 'authored' },
)

const receivedImages = useCollection(
  query(
    collection(db, `collection/${user.value!.uid}/received`),
    orderBy('timestamp', 'desc'),
    limit(3),
  ),
  { ssrKey: 'received' },
)
</script>

<template>
  <div class="space-y-4">
    <div>
      <h2>Authored Images</h2>
      <ul>
        <li v-for="authoredImage in authoredImages" :key="authoredImage.src">
          <img :src="authoredImage.src" alt="Encoded Canvas Image">
        </li>
      </ul>
    </div>

    <div>
      <h2>Received Images</h2>
      <ul>
        <li v-for="receivedImage in receivedImages" :key="receivedImage.src">
          <img :src="receivedImage.src" alt="Encoded Canvas Image">
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: default
  title: Collection
</route>
