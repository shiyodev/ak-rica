import type { layout } from '@/data/index.gen'
import { useEffect, useRef } from 'react'

export function RoomDetails({
  room,
  onClose,
}: {
  room: (typeof layout)[number] | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (room && !dialog.open) dialog.showModal()
    if (!room && dialog.open) dialog.close()
  }, [room])

  if (!room) return
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
