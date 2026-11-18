import type { BaseData, Room, RoomType } from '@/components/base/model/Base'

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param room The room whose type shall be changed
 * @param roomType The rooms new type
 * @returns
 */
export function updateRoomType(base: BaseData, room: Room, roomType: RoomType) {
  return {
    ...base,
    [room.id]: {
      ...base[room.id],
      roomType,
    },
  }
}
