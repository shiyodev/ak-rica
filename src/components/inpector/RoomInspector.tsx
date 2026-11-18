import { useBase } from '@/components/base/hooks/useBase'
import { useBaseMutations } from '@/components/base/hooks/useBaseMutations'
import type { LayoutSlot } from '@/components/base/models/Base'
import { OperatorGrid } from '@/components/inpector/OperatorGrid'
import { OutputRoomTypeOptions } from '@/components/inpector/RoomTypeOptions'
import { useEffect, useRef } from 'react'

export function RoomInspector({
  room,
  onClose,
}: {
  room: LayoutSlot | null
  onClose: VoidFunction
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { base, setBase } = useBase()
  const { setRoomType } = useBaseMutations()

  useEffect(() => {
    const dialog = dialogRef.current
    if (room) dialog?.showModal()
  }, [room])

  if (!room) return null
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
      <h2 className="text-lg font-semibold">{room.id}</h2>
      {room.category === 'OUTPUT' && (
        <OutputRoomTypeOptions onSelect={(type) => setRoomType(room, type)} />
      )}
      <OperatorGrid roomId={room.id} base={base} setBase={setBase} />
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
