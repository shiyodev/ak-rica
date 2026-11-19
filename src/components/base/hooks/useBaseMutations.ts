import { useBase } from '@/components/base/hooks/useBase'
import type { BaseCell, RoomType } from '@/components/base/models/Base'
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
    setRoomType: (cell: BaseCell, type: RoomType) => {
      setBase((base) => setRoomType(base, cell, type))
    },
    addOperator: (cell: BaseCell, operatorId: string) => {
      setBase((base) => addOperator(base, cell, operatorId))
    },
    removeOperator: (cell: BaseCell, operatorId: string) => {
      setBase((base) => removeOperator(base, cell, operatorId))
    },
  }
}
