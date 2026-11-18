import type { BaseData, CellData, Room, RoomType } from '@/components/base/model/Base'
import { layout, rooms } from '@/data/index.gen'

/**
 * Initializes the base grid
 * @returns The default base grid
 */
export function initBase() {
  const base = getLayout()
  return withUniqueRoomTypes(base)
}

/**
 * @returns The generic base layout
 */
function getLayout(): BaseData {
  const isFillerRoom = (room: Room) =>
    ['ELEVATOR', 'CORRIDOR'].includes(room.category)

  return Object.fromEntries(
    Object.values(layout).map((room) => [
      room.id,
      {
        roomType: getRoomType(room),
        isSelectable: !isFillerRoom(room),
        operators: [],
      } satisfies CellData,
    ]),
  )
}

//? Checks 3 different sources where the room type may be defined because the gamedata is weird
//! Order of checks + returns is important; dont change
function getRoomType(
  room: Room,
): RoomType | null {
  const isRoomType = (value: string): value is RoomType =>
    Object.keys(rooms).includes(value)

  const { category } = room
  if (isRoomType(category)) return category // ELEVATOR + CORRIDOR

  const matchingRooms = Object.values(rooms).filter(
    (room) => room.category === category,
  )
  if (matchingRooms.length !== 1) return null // OUTPUT + FUNCTION + SPECIAL(CC)
  return isRoomType(matchingRooms[0].id) ? matchingRooms[0].id : null // DORMITORY + PRIVATE
}

/**
 * Assigns the room type of every function-category cell
 * @param base The base data to be updated
 * @returns The updated base data
 */
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
