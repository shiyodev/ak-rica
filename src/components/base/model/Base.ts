import { rooms } from '@/data/index.gen'

export type RoomType = keyof typeof rooms | 'OUTPUT'
export type CellData = {
  roomType: RoomType | null
  isSelectable: boolean
  operators: string[]
}
export type BaseData = Record<string, CellData>
