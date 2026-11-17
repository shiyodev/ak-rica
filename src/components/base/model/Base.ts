import { rooms } from '@/data/index.gen'

/**
 * Possible room types a base grid cell can have.
 */
export type RoomType = keyof typeof rooms

/**
 * Represents the state of a cell within the base grid.
 */
export type CellData = {
  roomType: RoomType | null
  isSelectable: boolean
  operators: string[]
}

/**
 * Represents the state of the entire base grid.
 */
export type BaseData = Record<string, CellData>
