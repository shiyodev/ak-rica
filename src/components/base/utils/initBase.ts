import type { BaseData, CellData, RoomType } from '@/components/base/model/Base'
import { layout, rooms } from '@/data/index.gen'

function isRoomType(value: string): value is RoomType {
  return Object.keys(rooms).includes(value)
}

function getRoomType(
  cell: (typeof layout)[keyof typeof layout],
): RoomType | null {
  const { category } = cell
  if (isRoomType(category)) return category

  const matchingRooms = Object.values(rooms).filter(
    (room) => room.category === category,
  )
  if (matchingRooms.length !== 1) return null
  return isRoomType(matchingRooms[0].id) ? matchingRooms[0].id : null
}

export function initBase() {
  const base: BaseData = Object.fromEntries(
    Object.values(layout).map((cell) => [
      cell.id,
      {
        roomType: getRoomType(cell),
        isSelectable: true,
        operators: [],
      } satisfies CellData,
    ]),
  )
  assignFunctionRooms(base)

  Object.values(layout)
    .filter((cell) => ['ELEVATOR', 'CORRIDOR'].includes(cell.category))
    .forEach((cell) => (base[cell.id].isSelectable = false))
  return base
}

function assignFunctionRooms(base: BaseData) {
  const functionRooms = {
    slot_34: { roomType: 'CONTROL' },
    slot_36: { roomType: 'MEETING' },
    slot_32: { roomType: 'WORKSHOP' },
    slot_23: { roomType: 'HIRE' },
    slot_13: { roomType: 'TRAINING' },
  } satisfies Record<string, Partial<CellData>>

  for (const [id, update] of Object.entries(functionRooms))
    Object.assign(base[id], update)
}
