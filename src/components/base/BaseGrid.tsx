import { layout } from '@/data/index.gen'
import { dimensions } from '@/components/base/utils/dimensions'
import type {
  CellId,
  LayoutSlot,
  LayoutSlotId,
} from '@/components/base/models/Base'
import { BaseGridCell } from '@/components/base/BaseGridCell'

const cellSize = 32

/**
 * Constructs the base grid and renders each cell
 */
export function BaseGrid({
  onCellSelect,
}: {
  onCellSelect: (cellId: CellId) => void
}) {
  const layoutEntries = Object.entries(layout) as [LayoutSlotId, LayoutSlot][]

  return (
    <section
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${dimensions.colCount}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
      }}
    >
      {layoutEntries.map(([id, slot]) => (
        <BaseGridCell
          key={id}
          cellId={id}
          slot={slot}
          onCellSelect={onCellSelect}
        />
      ))}
    </section>
  )
}
