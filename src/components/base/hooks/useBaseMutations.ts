import { useBase } from '@/components/base/hooks/useBase'
import type { LayoutSlot, RoomType } from '@/components/base/models/Base'
import { updateRoomType } from '@/components/base/utils/baseActions'

/**
 * @returns Actions to mutate the current base state.
 */
export function useBaseMutations() {
  const { setBase } = useBase()

  return {
    setRoomType: (room: LayoutSlot, type: RoomType) => {
      setBase((base) => updateRoomType(base, room, type))
    },
  }
}
