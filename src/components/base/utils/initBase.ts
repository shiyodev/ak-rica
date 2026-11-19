import type {
  BaseData,
  BaseCell,
  LayoutSlot,
  RoomType,
  LayoutSlotId,
} from '@/components/base/models/Base'
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
 * @returns The raw base layout
 */
function getLayout() {
  const isFillerRoom = (room: LayoutSlot) =>
    ['ELEVATOR', 'CORRIDOR'].includes(room.category)

  const base = {} as BaseData
  const layoutEntries = Object.entries(layout) as [LayoutSlotId, LayoutSlot][]

  for (const [id, slot] of layoutEntries)
    base[id] = {
      id,
      roomType: getRoomType(slot),
      isSelectable: !isFillerRoom(slot),
      operators: [],
    }
  return base
}

//? Checks 3 different sources where the room type may be defined because the gamedata is weird
//! Order of checks + returns is important; dont change
function getRoomType(room: LayoutSlot): RoomType | null {
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
 * Assigns all unique room types
 * @param base The base data to be updated
 * @returns The updated base data
 */
function withUniqueRoomTypes(base: BaseData): BaseData {
  const updated = { ...base }
  const uniqueRooms = {
    slot_34: { roomType: 'CONTROL' },
    slot_36: { roomType: 'MEETING' },
    slot_32: { roomType: 'WORKSHOP' },
    slot_23: { roomType: 'HIRE' },
    slot_13: { roomType: 'TRAINING' },
  } satisfies Partial<Record<LayoutSlotId, Pick<BaseCell, 'roomType'>>>

  for (const id of Object.keys(uniqueRooms) as (keyof typeof uniqueRooms)[])
    updated[id] = { ...updated[id], ...uniqueRooms[id] }

  return updated
}
