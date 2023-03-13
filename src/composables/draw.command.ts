import type Konva from 'konva'
import type { Observable } from 'rxjs'
import type { Command } from '~/composables/command'
import { useDrawer } from '~/composables/drawer'
import type { Mode } from '~/stores/toolbar'

export class DrawLineCommand implements Command {
  private line: Konva.Line | null = null

  constructor(
    private layer: Konva.Layer,
    private positionObservable: Observable<Konva.Vector2d>,
    private color: string,
    private mode: Mode,
  ) {}

  execute() {
    const { beginDrawLine, continueDrawLine } = useDrawer()

    this.line = beginDrawLine(this.layer, this.color, this.mode)

    this.positionObservable.subscribe((position) => {
      continueDrawLine(this.line!, position)
    })
  }

  undo() {
    this.line!.destroy()
  }
}
