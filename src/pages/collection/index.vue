<script setup lang="ts">
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
const db = useFirestore()

const images = useCollection(collection(db, 'images'))
</script>

<template>
  <ul>
    <li v-for="image in images" :key="image.img">
      <img :src="image.img" alt="Encoded Canvas Image">
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: default
  title: Collection
</route>
