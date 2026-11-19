import { getAvatarPath } from '@/utils/avatars'
import { layout } from '@/data/index.gen'
import { dimensions } from '@/components/base/utils/dimensions'
import { useBase } from '@/components/base/hooks/useBase'
import type {
  BaseCell,
  LayoutSlot,
  LayoutSlotId,
} from '@/components/base/models/Base'

const cellSize = 32

export function BaseGrid({
  onCellSelect,
}: {
  onCellSelect: (cell: BaseCell) => void
}) {
  const { base } = useBase()
  const layoutEntries = Object.entries(layout) as [LayoutSlotId, LayoutSlot][]

  return (
    <section
      className="grid auto-rows-12 p-2"
      style={{
        gridTemplateColumns: `repeat(${dimensions.colCount}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
      }}
    >
      {layoutEntries.map(([id, slot]) => {
        const cell = base[id]
        const room = cell.isSelectable ? (cell.roomType ?? 'OUTPUT') : null
        const rowPos = dimensions.rowCount - slot.offset.row - slot.size.row

        return (
          <div
            key={slot.id}
            className="bg-blue-900 m-0.5"
            onClick={() => {
              if (base[id].isSelectable) onCellSelect(base[id])
            }}
            style={{
              gridColumn: `${slot.offset.col + 1} / span ${slot.size.col}`,
              gridRow: `${rowPos + 1} / span ${slot.size.row}`,
            }}
          >
            {room}
            <div className="grid gap-1 grid-cols-5">
              {base[id].operators.map((op) => (
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
