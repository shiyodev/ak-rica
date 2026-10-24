import { layout, rooms } from '@/data/index.gen'

const cellSize = 32

const { colCount, rowCount } = layout.reduce(
  (dimensions, cell) => ({
    colCount: Math.max(dimensions.colCount, cell.offset.col + cell.size.col),
    rowCount: Math.max(dimensions.rowCount, cell.offset.row + cell.size.row),
  }),
  { colCount: 0, rowCount: 0 },
)

export function BaseGrid({
  onSelect,
}: {
  onSelect: (cell: (typeof layout)[number]) => void
}) {
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
        const isSelectable = Object.values(rooms)
          .find((room) => room.category == cell.category)! // TODO: if checks/test have been made remove Exclamation mark
          .phases.some((room) => room.maxStationedNum > 0)

        // TODO: Temp
        let text = (
          <>
            {cell.id}
            <br />
            {cell.category}
          </>
        )
        if (!isSelectable) text = <></>

        return (
          <div
            key={cell.id}
            className="bg-blue-900 m-0.5"
            onClick={() => {
              if (isSelectable) onSelect(cell)
            }}
            style={{
              gridColumn: `${cell.offset.col + 1} / span ${cell.size.col}`,
              gridRow: `${rowPos + 1} / span ${cell.size.row}`,
            }}
          >
            {text}
          </div>
        )
      })}
    </section>
  )
}
