import { getAvatarPath } from '@/utils/data-store'
import { layout } from '@/data/index.gen'
import { baseColCount, baseRowCount } from '@/components/base/utils/baseDimensions'
import type { BaseData } from '@/components/base/model/Base'

const cellSize = 32

export function BaseGrid({
  base,
  onSelect,
}: {
  base: BaseData
  onSelect: (cell: (typeof layout)[keyof typeof layout]) => void
}) {
  return (
    <section
      className="grid auto-rows-12 p-2"
      style={{
        gridTemplateColumns: `repeat(${baseColCount}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
      }}
    >
      {Object.values(layout).map((cell) => {
        const slot = base[cell.id]
        const room = slot.isSelectable ? slot.roomType : null
        const rowPos = baseRowCount - cell.offset.row - cell.size.row

        return (
          <div
            key={cell.id}
            className="bg-blue-900 m-0.5"
            onClick={() => {
              if (base[cell.id].isSelectable) onSelect(cell)
            }}
            style={{
              gridColumn: `${cell.offset.col + 1} / span ${cell.size.col}`,
              gridRow: `${rowPos + 1} / span ${cell.size.row}`,
            }}
          >
            {room}
            <div className="grid gap-1 grid-cols-5">
              {base[cell.id].operators.map((op) => (
                <img
                  key={op}
                  src={getAvatarPath(op)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-8 rounded"
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
