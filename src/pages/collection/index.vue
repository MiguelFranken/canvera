<script setup lang="ts">
import { useCollection, useFirestore } from 'vuefire'
import { collection, limit, orderBy, query } from 'firebase/firestore'
const db = useFirestore()

const q = query(
  collection(db, 'images'),
  orderBy('timestamp', 'desc'),
  limit(3),
)

const images = useCollection(q, { ssrKey: 'my-quiz' })
</script>

<template>
  <ul>
    <li v-for="image in images" :key="image.img">
      <img :src="image.src" alt="Encoded Canvas Image">
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: default
  title: Collection
</route>
