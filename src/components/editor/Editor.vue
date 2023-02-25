<script setup lang="ts">
import { useCanvasStore } from '~/stores/canvas'
const { initStage } = useCanvasStore()

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  initStage(container.value!)
})
</script>

<template>
  <div ref="container" class="outline outline-4 outline-offset-0 outline-indigo-600" />
</template>
