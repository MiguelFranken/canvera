<script setup lang="ts">
import {
  ListboxButton,
  Listbox as ListboxComponent,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue-demi'
import type { IListboxOption } from '~/components/patterns/listbox/Listbox.interface'

interface Props {
  options: IListboxOption[]
  modelValue: IListboxOption['id']
}

interface Emits {
  (event: 'update:modelValue', value: IListboxOption['id']): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { options, modelValue } = toRefs(props)

const selectedOption = computed(() => {
  const mappedOption = options.value.find(option => option.id === props.modelValue)
  if (mappedOption)
    return mappedOption

  console.error(`There is no option with id: ${props.modelValue}`)
  return options.value[0]
})

const model = computed<string>({
  get(): IListboxOption['id'] {
    return modelValue.value
  },
  set(value: IListboxOption['id']) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="w-72">
    <ListboxComponent v-model="model">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedOption.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.name"
              :value="option.id"
              as="template"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4" :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                ]"
              >
                <span
                  class="block truncate" :class="[
                    selected ? 'font-medium' : 'font-normal',
                  ]"
                >{{ option.name }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </ListboxComponent>
  </div>
</template>
