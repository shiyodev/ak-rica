import type { BaseData, CellData, RoomType } from '@/components/base/model/Base'
import { layout, rooms } from '@/data/index.gen'


export function initBase() {
  const base = getLayout()
  return withUniqueRoomTypes(base)
}

function getLayout(): BaseData {
  const isFillerRoom = (cell: (typeof layout)[keyof typeof layout]) =>
    ['ELEVATOR', 'CORRIDOR'].includes(cell.category)

  return Object.fromEntries(
    Object.values(layout).map((cell) => [
      cell.id,
      {
        roomType: getRoomType(cell),
        isSelectable: !isFillerRoom(cell),
        operators: [],
      } satisfies CellData,
    ]),
  )
}

//? Checks 3 different sources where the room type may be defined because the gamedata is weird
//! Order of checks + returns is important; dont change
function getRoomType(
  cell: (typeof layout)[keyof typeof layout],
): RoomType | null {
  const isRoomType = (value: string): value is RoomType =>
    Object.keys(rooms).includes(value)

  const { category } = cell
  if (isRoomType(category)) return category // ELEVATOR + CORRIDOR

  const matchingRooms = Object.values(rooms).filter(
    (room) => room.category === category,
  )
  if (matchingRooms.length !== 1) return null // OUTPUT + FUNCTION + SPECIAL(CC)
  return isRoomType(matchingRooms[0].id) ? matchingRooms[0].id : null // DORMITORY + PRIVATE
}

function withUniqueRoomTypes(base: BaseData): BaseData {
  const updated = { ...base }
  const functionRooms = {
    slot_34: { roomType: 'CONTROL' },
    slot_36: { roomType: 'MEETING' },
    slot_32: { roomType: 'WORKSHOP' },
    slot_23: { roomType: 'HIRE' },
    slot_13: { roomType: 'TRAINING' },
  } satisfies Record<string, Partial<CellData>>

  for (const [id, roomType] of Object.entries(functionRooms))
    updated[id] = { ...updated[id], ...roomType }

  return updated
}
