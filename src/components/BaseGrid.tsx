import { layout } from '@/data/index.gen'

const cellSize = 32

const { colCount, rowCount } = layout.reduce(
  (dimensions, cell) => ({
    colCount: Math.max(dimensions.colCount, cell.offset.col + cell.size.col),
    rowCount: Math.max(dimensions.rowCount, cell.offset.row + cell.size.row),
  }),
  { colCount: 0, rowCount: 0 },
)

export function BaseGrid() {
  return (
    <section
      className="grid auto-rows-12 p-2"
      style={{
        gridTemplateColumns: `repeat(${colCount}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
      }}
    >
      {layout.map((cell) => {
        const rowPos = rowCount - cell.offset.row - cell.size.row
        return (
          <div
            key={cell.id}
            className="bg-blue-900 m-0.5"
            style={{
              gridColumn: `${cell.offset.col + 1} / span ${cell.size.col}`,
              gridRow: `${rowPos + 1} / span ${cell.size.row}`,
            }}
          >
            {cell.id}
            <br />
            {cell.category}
          </div>
        )
      })}
    </section>
  )
}
