import type Konva from 'konva'
import type { Observable, Subscription } from 'rxjs'
import type { Command } from '~/composables/command'
import { useDrawer } from '~/composables/drawer'
import type { Mode } from '~/stores/toolbar'

export class DrawLineCommand implements Command {
  private line: Konva.Line | null = null
  private subscription: Subscription | null = null
  private positions: Konva.Vector2d[] = []

  constructor(
    private layer: Konva.Layer,
    private positionObservable: Observable<Konva.Vector2d>,
    private color: string,
    private mode: Mode,
  ) {}

  execute() {
    const { beginDrawLine, continueDrawLine } = useDrawer()

    this.line = beginDrawLine(this.layer, this.color, this.mode)

    this.positions.forEach(position => continueDrawLine(this.line!, position))

    if (this.positions.length === 0) {
      this.subscription = this.positionObservable.subscribe((position) => {
        this.positions.push(position)
        continueDrawLine(this.line!, position)
      })
    }
  }

  undo() {
    this.subscription?.unsubscribe()
    this.line!.destroy()
  }
}
