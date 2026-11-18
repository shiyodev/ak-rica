import { useBase } from '@/components/base/context/useBase'
import type { RoomType } from '@/components/base/model/Base'
import { OperatorGrid } from '@/components/base/OperatorGrid'
import { Button } from '@/components/ui/button'
import { rooms, type layout } from '@/data/index.gen'
import { useEffect, useRef } from 'react'

interface RoomDetailsProps {
  room: (typeof layout)[keyof typeof layout] | null
  onClose: () => void
}

const outputRoomTypes = (Object.keys(rooms) as RoomType[]).filter(
  (roomType) => rooms[roomType].category === 'OUTPUT',
)

function OutputRoomTypeOptions({
  onSelect,
}: {
  onSelect: (roomType: RoomType) => void
}) {
  return (
    <>
      {outputRoomTypes.map((roomType) => (
        <Button
          size={'lg'}
          variant={'secondary'}
          key={roomType}
          onClick={() => onSelect(roomType)}
        >
          {roomType}
        </Button>
      ))}
    </>
  )
}

export function RoomDetails({ room, onClose }: RoomDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { base, setBase } = useBase()

  useEffect(() => {
    const dialog = dialogRef.current
    if (room) dialog?.showModal()
  }, [room])

  if (!room) return null
  const selectOutputRoomType = (roomType: RoomType) => {
    setBase({
      ...base,
      [room.id]: {
        ...base[room.id],
        roomType,
      },
    })
  }

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
        <OutputRoomTypeOptions onSelect={selectOutputRoomType} />
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
