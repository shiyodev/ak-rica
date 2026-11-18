import { layout, rooms } from '@/data/index.gen'

/**
 * Represents a room of the RIIC
 * *This type is defined by the game itself
 */
export type Room = (typeof layout)[keyof typeof layout]

/**
 * Possible room types a base grid cell can have.
 */
export type RoomType = keyof typeof rooms

/**
 * Represents a cell within the base grid.
 */
export type CellData = {
  roomType: RoomType | null
  isSelectable: boolean
  operators: string[]
}

/**
 * Represents the entire base grid.
 */
export type BaseData = Record<string, CellData>
