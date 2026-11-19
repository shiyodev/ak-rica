import type {
  BaseData,
  CellId,
  RoomType,
} from '@/components/base/models/Base'

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param id The cell ID whose type shall be changed
 * @param roomType The rooms new type
 */
export function setRoomType(
  base: BaseData,
  id: CellId,
  roomType: RoomType,
): BaseData {
  return {
    ...base,
    [id]: {
      ...base[id],
      roomType,
    },
  }
}

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param cellId The cell a new operator is assigned to
 * @param operatorId The ID of the newly assigned operator
 */
export function addOperator(
  base: BaseData,
  cellId: CellId,
  operatorId: string,
): BaseData {
  return {
    ...base,
    [cellId]: {
      ...base[cellId],
      operators: base[cellId].operators.concat([operatorId]),
    },
  }
}

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param cellId The cell a operator is removed from
 * @param operatorId The ID of the removed operator
 */
export function removeOperator(
  base: BaseData,
  cellId: CellId,
  operatorId: string,
): BaseData {
  return {
    ...base,
    [cellId]: {
      ...base[cellId],
      operators: base[cellId].operators.filter((i) => i != operatorId),
    },
  }
}
