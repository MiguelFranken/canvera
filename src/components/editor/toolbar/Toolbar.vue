<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'

const { mode } = storeToRefs(useToolbarStore())
</script>

<template>
  <div class="space-y-6">
    <ToolbarActions />
    <ColorSelection v-if="mode === 'brush'" />
  </div>
</template>

<style lang="scss" scoped></style>
