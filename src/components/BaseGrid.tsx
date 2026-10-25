import { layout, rooms } from '@/data/index.gen'

const cellSize = 32

const { colCount, rowCount } = Object.values(layout).reduce(
  (dimensions, cell) => ({
    colCount: Math.max(dimensions.colCount, cell.offset.col + cell.size.col),
    rowCount: Math.max(dimensions.rowCount, cell.offset.row + cell.size.row),
  }),
  { colCount: 0, rowCount: 0 },
)

export function BaseGrid({
  onSelect,
}: {
  onSelect: (cell: (typeof layout)[keyof typeof layout]) => void
}) {
  return (
    <section
      className="grid auto-rows-12 p-2"
      style={{
        gridTemplateColumns: `repeat(${colCount}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
      }}
    >
      {Object.values(layout).map((cell) => {
        const rowPos = rowCount - cell.offset.row - cell.size.row
        const roomType = Object.values(rooms).find(
          (room) => room.category == cell.category,
        )! // TODO: if checks/test have been made remove Exclamation mark
        const isSelectable = !['ELEVATOR', "CORRIDOR"].includes(cell.category)

        let room = cell.category
        if (!isSelectable) room = ''
        else if (
          Object.values(rooms).filter((room) => room.category == cell.category)
            .length == 1
        )
          room = roomType.id

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
            {room}
          </div>
        )
      })}
    </section>
  )
}
