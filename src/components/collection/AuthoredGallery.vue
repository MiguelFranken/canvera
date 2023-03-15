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
</script>

<template>
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
</template>

<style lang="scss" scoped></style>
