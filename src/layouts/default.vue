<script setup lang="ts">
import type { ComputedRef } from 'vue-demi'

const title: ComputedRef<string> = computed<string>(() => useRouter().currentRoute.value.meta.title ?? '')
</script>

<template>
  <Header :title="title" />

  <main>
    <RouterView />
  </main>

  <Footer />
</template>
