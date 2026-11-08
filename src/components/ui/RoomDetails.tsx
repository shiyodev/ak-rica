import type { BaseData, RoomType } from '@/components/Base'
import { Button } from '@/components/ui/button'
import { rooms, type layout } from '@/data/index.gen'
import { useEffect, useRef } from 'react'

export function RoomDetails({
  room,
  base,
  onClose,
  onSelect,
}: {
  room: (typeof layout)[keyof typeof layout] | null
  base: BaseData
  onClose: () => void
  onSelect: (base: BaseData) => void
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
      <div>
        {room.category === 'OUTPUT' &&
          Object.values(rooms)
            .filter((room) => room.category === 'OUTPUT')
            .map((outRooms) => (
              <Button
                size={'lg'}
                variant={'secondary'}
                key={outRooms.id}
                onClick={() =>
                  onSelect({
                    ...base,
                    [room.id]: {
                      ...base[room.id],
                      roomType: outRooms.id as RoomType,
                    },
                  })
                }
              >
                {outRooms.id}
              </Button>
            ))}
      </div>
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
