import Konva from 'konva'
import type { Mode } from '~/stores/toolbar'

export const useDrawer = () => {
  const beginDrawLine = (
    layer: Konva.Layer,
    // position: Konva.Vector2d,
    color: string,
    mode: Mode,
  ) => {
    const line = new Konva.Line({
      stroke: color,
      strokeWidth: 30,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',

      // round cap for smoother lines
      lineCap: 'round',
      lineJoin: 'round',

      // add point twice, so we have some drawings even on a simple click
      // points: [position.x, position.y, position.x, position.y],
      points: [],
    })
    layer.add(line)
    return line
  }

  const continueDrawLine = (line: Konva.Line, position: Konva.Vector2d) => {
    let updatedPoints: number[] = []

    if (line.points().length === 0) {
      updatedPoints = [position.x, position.y, position.x, position.y]
    }
    else {
      const [prevX, prevY] = [
        line.points()[line.points().length - 2]!,
        line.points()[line.points().length - 1]!,
      ]
      const newPosition = [
        position.x,
        position.y,
      ]
      let newPoints: number[] = []

      let dx = newPosition[0] - prevX
      let dy = newPosition[1] - prevY
      const dist = Math.max(Math.abs(dx), Math.abs(dy))

      // drawing always generates little artifacts
      if (dist <= 10)
        return

      dx = dx / dist
      dy = dy / dist

      let x = prevX
      let y = prevY

      // interpolate between previous point and current point to draw
      for (let d = 0; d < dist; d += 5) {
        newPoints = newPoints.concat([x, y])

        x += dx
        y += dy
      }

      updatedPoints = line.points().concat(newPoints)
    }

    line.points(updatedPoints)
  }

  return {
    beginDrawLine,
    continueDrawLine,
  }
}
