import { useBaseMutations } from '@/components/base/hooks/useBaseMutations'
import type { CellId } from '@/components/base/models/Base'
import { OperatorManagement } from '@/components/inspector/OperatorGrid'
import { OutputRoomTypeOptions } from '@/components/inspector/RoomTypeOptions'
import { layout } from '@/data/index.gen'
import { useEffect, useRef, type RefObject } from 'react'

/**
 * Renders the inspector highlighting the information of the given cell
 */
export function CellInspector({
  cellId,
  onClose,
}: {
  cellId: CellId | null
  onClose: VoidFunction
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { setRoomType } = useBaseMutations()

  useEffect(() => {
    const dialog = dialogRef.current
    if (cellId && dialog && !dialog.open) dialog.showModal()
  }, [cellId])

  if (!cellId) return null
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={closeOnBackdropClick()}
      className="m-auto rounded-lg bg-zinc-900 p-6 text-foreground backdrop:bg-black/60"
    >
      <h2 className="text-lg font-semibold">{cellId}</h2>
      {layout[cellId].category === 'OUTPUT' && (
        <OutputRoomTypeOptions onSelect={(type) => setRoomType(cellId, type)} />
      )}
      <OperatorManagement cellId={cellId} />
      <CloseInspectorButton dialogRef={dialogRef} />
    </dialog>
  )

  function closeOnBackdropClick():
    import('react').MouseEventHandler<HTMLDialogElement> | undefined {
    return (event) => {
      if (event.target === event.currentTarget) {
        dialogRef.current?.close()
      }
    }
  }
}

function CloseInspectorButton({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>
}) {
  return (
    <button
      type="button"
      onClick={() => dialogRef.current?.close()}
      className="mt-4 rounded bg-zinc-700 px-3 py-2 hover:bg-zinc-600"
    >
      Close
    </button>
  )
}
