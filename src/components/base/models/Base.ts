import { layout, rooms } from '@/data/index.gen'

/**
 * Static grid cell information (size, position, category).
 */
export type LayoutSlot = (typeof layout)[keyof typeof layout]
export type LayoutSlotId = keyof typeof layout

/**
 * Possible RIIC room types.
 * Doubles as the key for the room definitions.
 */
export type RoomType = keyof typeof rooms

/**
 * Static definition of a RIIC room.
 */
export type RoomDefinition = (typeof rooms)[RoomType]

/**
 * Runtime state of a grid cell.
 */
export type BaseCell = {
  id: LayoutSlotId
  roomType: RoomType | null
  isSelectable: boolean
  operators: string[]
}

/**
 * Runtime state of every base grid cell.
 */
export type BaseData = Record<LayoutSlotId, BaseCell>
