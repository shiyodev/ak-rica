import { useBase } from '@/components/base/hooks/useBase'
import { useBaseMutations } from '@/components/base/hooks/useBaseMutations'
import type { CellId } from '@/components/base/models/Base'
import { avatars, getAvatarPath } from '@/utils/avatars'
import { getFilestem } from '@/utils/utils'

/**
 * Renders the management system for assigning operators to the given cell
 */
export function OperatorManagement({ cellId }: { cellId: CellId }) {
  return (
    <div className="h-[50vh] overflow-y-auto">
      Selection
      <AssignedOperators cellId={cellId} />
      Operators
      <AvailableOperators cellId={cellId} />
    </div>
  )
}

/**
 * Renders all to the given cell assigned opertor avatars.
 * Clicking an avatar removes them from the cell assignment.
 */
function AssignedOperators({ cellId }: { cellId: CellId }) {
  const { base } = useBase()
  const { removeOperator } = useBaseMutations()

  return (
    <div className="grid gap-2 grid-cols-5">
      {base[cellId].operators.map((op) => (
        <img
          key={op}
          src={getAvatarPath(op)}
          alt=""
          decoding="async"
          className="h-32 w-32 rounded"
          onClick={() => removeOperator(cellId, op)}
        />
      ))}
    </div>
  )
}

/**
 * Renders a grid of all operator avatars.
 * Clicking on an avatar assigns the operator to the given cell.
 */
function AvailableOperators({ cellId }: { cellId: CellId }) {
  const { addOperator } = useBaseMutations()

  return (
    <div className="grid gap-2 grid-cols-5">
      {avatars.map((avatarPath) => (
        <img
          key={avatarPath}
          src={avatarPath}
          alt={avatarPath}
          loading="lazy"
          decoding="async"
          className="h-32 w-32 rounded"
          onClick={() => addOperator(cellId, getFilestem(avatarPath))}
        />
      ))}
    </div>
  )
}
