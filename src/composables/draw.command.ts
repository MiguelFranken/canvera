import type Konva from 'konva'
import type { Observable, Subscription } from 'rxjs'
import type { Command } from '~/composables/command'
import { useDrawer } from '~/composables/drawer'
import type { Mode } from '~/stores/toolbar'

export class DrawLineCommand implements Command {
  private line: Konva.Line | null = null
  private subscription: Subscription | null = null
  private points: number[] = []

  constructor(
    private layer: Konva.Layer,
    private positionObservable: Observable<Konva.Vector2d>,
    private color: string,
    private mode: Mode,
  ) {}

  execute() {
    const { beginDrawLine, continueDrawLine, drawPoints } = useDrawer()

    this.line = beginDrawLine(this.layer, this.color, this.mode)

    drawPoints(this.line, this.points)

    if (this.points.length === 0) {
      this.subscription = this.positionObservable.subscribe((position) => {
        const updatedPoints = continueDrawLine(this.line!, position)
        if (updatedPoints)
          this.points = updatedPoints
      })
    }
  }

  undo() {
    this.subscription?.unsubscribe()
    this.line!.destroy()
  }
}
