<script setup lang="ts">
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

defineOptions({
  name: 'IndexPage',
})

const user = useCurrentUser()

const auth = useFirebaseAuth()
</script>

<template>
  <div>
    <p>Main Page</p>
    <p>Current User: '{{ user }}'</p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
