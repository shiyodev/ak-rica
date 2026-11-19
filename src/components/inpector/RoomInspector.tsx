import { useBase } from '@/components/base/hooks/useBase'
import { useBaseMutations } from '@/components/base/hooks/useBaseMutations'
import type { BaseCell } from '@/components/base/models/Base'
import { OperatorGrid } from '@/components/inpector/OperatorGrid'
import { OutputRoomTypeOptions } from '@/components/inpector/RoomTypeOptions'
import { layout } from '@/data/index.gen'
import { useEffect, useRef } from 'react'

export function CellInspector({
  cell,
  onClose,
}: {
  cell: BaseCell | null
  onClose: VoidFunction
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { base, setBase } = useBase()
  const { setRoomType } = useBaseMutations()

  useEffect(() => {
    const dialog = dialogRef.current
    if (cell) dialog?.showModal()
  }, [cell])

  if (!cell) return null
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialogRef.current?.close()
        }
      }}
      className="m-auto rounded-lg bg-zinc-900 p-6 text-foreground backdrop:bg-black/60"
    >
      <h2 className="text-lg font-semibold">{cell.id}</h2>
      {layout[cell.id].category === 'OUTPUT' && (
        <OutputRoomTypeOptions onSelect={(type) => setRoomType(cell, type)} />
      )}
      <OperatorGrid cell={cell} base={base} setBase={setBase} />
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        className="mt-4 rounded bg-zinc-700 px-3 py-2 hover:bg-zinc-600"
      >
        Close
      </button>
    </dialog>
  )
}
