import { defineStore } from 'pinia'

export type Mode = 'brush' | 'eraser'

export const useToolbarStore = defineStore('toolbar', () => {
  const mode = ref<Mode>('brush')
  const color = ref<string>('red')

  function setPencilMode(m: Mode) {
    mode.value = m
  }

  function setPencilColor(c: string) {
    color.value = c
  }

  return {
    // state
    mode,
    color,

    // mutations
    setPencilMode,
    setPencilColor,
  }
})
