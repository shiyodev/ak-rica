import { useBase } from '@/components/base/hooks/useBase'
import type {
  BaseCell,
  CellId,
  LayoutSlot,
} from '@/components/base/models/Base'
import { dimensions } from '@/components/base/utils/dimensions'
import { getAvatarPath } from '@/utils/avatars'

interface BaseGridCellProps {
  cellId: CellId
  slot: LayoutSlot
  onCellSelect: (cellId: CellId) => void
}

/**
 * Renders the cell with the additional information contained in slot
 */
export function BaseGridCell({
  cellId,
  slot,
  onCellSelect,
}: BaseGridCellProps) {
  const { base } = useBase()
  const cell = base[cellId]
  const rowPos = dimensions.rowCount - slot.offset.row - slot.size.row

  const cellClick = () => {
    if (cell.isSelectable) onCellSelect(cellId)
  }

  return (
    <div
      className="bg-blue-900 m-0.5"
      onClick={cellClick}
      style={{
        gridColumn: `${slot.offset.col + 1} / span ${slot.size.col}`,
        gridRow: `${rowPos + 1} / span ${slot.size.row}`,
      }}
    >
      {cell.isSelectable ? (cell.roomType ?? 'OUTPUT') : null}
      <AssignedOperators cell={cell} />
    </div>
  )
}

/**
 * Renders the operator avatars assigned to the given cell
 */
function AssignedOperators({ cell }: { cell: BaseCell }) {
  return (
    <div className="grid gap-1 grid-cols-5">
      {cell.operators.map((op) => (
        <img
          key={op}
          src={getAvatarPath(op)}
          alt={op}
          loading="lazy"
          decoding="async"
          className="h-8 w-8 rounded"
        />
      ))}
    </div>
  )
}
