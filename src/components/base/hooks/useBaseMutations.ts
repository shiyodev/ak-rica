import { useBase } from '@/components/base/hooks/useBase'
import type { Room, RoomType } from '@/components/base/model/Base'
import { updateRoomType } from '@/components/base/utils/baseActions'

/**
 * @returns Actions to mutate the current base state.
 */
export function useBaseMutations() {
  const { setBase } = useBase()

  return {
    setRoomType: (room: Room, type: RoomType) => {
      setBase((base) => updateRoomType(base, room, type))
    },
  }
}
