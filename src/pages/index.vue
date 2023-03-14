<script setup lang="ts">
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { signOut } from 'firebase/auth'

defineOptions({
  name: 'IndexPage',
})

const user = useCurrentUser()
const auth = useFirebaseAuth()
const router = useRouter()

function onSignOut() {
  signOut(auth!)
    .then(() => {
      console.log('user logged out')
      router.push('/login')
    })
    .catch((error) => {
      console.log('error logging out: ', error)
    })
}
</script>

<template>
  <div>
    <p>Main Page</p>
    <p v-if="user">
      Current User: '{{ user.displayName }}'
    </p>
    <p>
      <Button @click="onSignOut">
        Sign Out
      </Button>
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
