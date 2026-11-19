import { useBase } from '@/components/base/hooks/useBase'
import type { CellId, RoomType } from '@/components/base/models/Base'
import {
  addOperator,
  removeOperator,
  setRoomType,
} from '@/components/base/utils/baseActions'

/**
 * @returns Actions to mutate the current base state.
 */
export function useBaseMutations() {
  //? base is evaluated on demand so it's always up to date
  const { setBase } = useBase()

  return {
    setRoomType: (cellId: CellId, type: RoomType) => {
      setBase((base) => setRoomType(base, cellId, type))
    },
    addOperator: (cellId: CellId, operatorId: string) => {
      setBase((base) => addOperator(base, cellId, operatorId))
    },
    removeOperator: (cellId: CellId, operatorId: string) => {
      setBase((base) => removeOperator(base, cellId, operatorId))
    },
  }
}
