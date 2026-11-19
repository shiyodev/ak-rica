import type {
  BaseCell,
  BaseData,
  RoomType,
} from '@/components/base/models/Base'

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param slot The room whose type shall be changed
 * @param roomType The rooms new type
 * @returns
 */
export function updateRoomType(base: BaseData, cell: BaseCell, roomType: RoomType) {
  return {
    ...base,
    [cell.id]: {
      ...base[cell.id],
      roomType,
    },
  }
}
