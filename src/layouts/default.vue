<script setup lang="ts">
const title = computed(() => useRouter().currentRoute.value.meta.title)
</script>

<template>
  <Header :title="title" />

  <main>
    <RouterView />
  </main>

  <Footer />
</template>
