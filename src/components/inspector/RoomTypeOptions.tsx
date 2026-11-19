import type { RoomType } from '@/components/base/models/Base'
import { Button } from '@/components/ui/button'
import { rooms } from '@/data/index.gen'

const outputRoomTypes = (Object.keys(rooms) as RoomType[]).filter(
  (roomType) => rooms[roomType].category === 'OUTPUT',
)

/**
 * Renders the options of output room types to select
 */
export function OutputRoomTypeOptions({
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
