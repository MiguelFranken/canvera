import { type ViteSSGContext } from 'vite-ssg'
import type Konva from 'konva'

export type UserModule = (ctx: ViteSSGContext) => void

export interface VueKonvaStage {
  getNode(): Konva.Stage
}
