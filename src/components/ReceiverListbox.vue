<script setup lang="ts">
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import { computed, watchEffect } from 'vue-demi'
import type { IListboxOption } from '~/components/patterns/listbox/Listbox.interface'

interface Props {
  modelValue: string
}

interface Emits {
  (event: 'update:modelValue', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const db = useFirestore()

const users = useCollection(collection(db, 'users'))

const options = computed<IListboxOption[]>(() => users.value.map(user => ({
  id: user.uid,
  name: user.displayName,
})))

const selectedOption = ref('')

watchEffect(() => {
  if (options.value.length === 0)
    return
  selectedOption.value = options.value[0].id
})

watch(selectedOption, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <Listbox v-if="options.length > 0" v-model="selectedOption" :options="options" />
</template>

<style lang="scss" scoped></style>
