<script setup lang="ts">
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

defineOptions({
  name: 'IndexPage',
})

const user = useCurrentUser()

const auth = useFirebaseAuth()

signInWithEmailAndPassword(auth!, 'miguelfranken90@gmail.com', 'Miguel1996')
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user
    console.log('user logged in: ', user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
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
