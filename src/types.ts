import { type ViteSSGContext } from 'vite-ssg'
import type Konva from 'konva'

export type UserModule = (ctx: ViteSSGContext) => void

export interface VueKonvaStage {
  getNode(): Konva.Stage
}

export interface VueKonvaLayer {
  getNode(): Konva.Layer
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
  }
}
