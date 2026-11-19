import type {
  BaseCell,
  BaseData,
  RoomType,
} from '@/components/base/models/Base'

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param cell The cell whose type shall be changed
 * @param roomType The rooms new type
 */
export function setRoomType(
  base: BaseData,
  cell: BaseCell,
  roomType: RoomType,
): BaseData {
  return {
    ...base,
    [cell.id]: {
      ...base[cell.id],
      roomType,
    },
  }
}

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param cell The cell a new operator is assigned to
 * @param operatorId The ID of the newly assigned operator
 */
export function addOperator(
  base: BaseData,
  cell: BaseCell,
  operatorId: string,
): BaseData {
  return {
    ...base,
    [cell.id]: {
      ...base[cell.id],
      operators: base[cell.id].operators.concat([operatorId]),
    },
  }
}

/**
 * Returns a copy of the base with the specified mutation
 * @param base The base object to copy from
 * @param cell The cell a operator is removed from
 * @param operatorId The ID of the removed operator
 */
export function removeOperator(
  base: BaseData,
  cell: BaseCell,
  operatorId: string,
): BaseData {
  return {
    ...base,
    [cell.id]: {
      ...base[cell.id],
      operators: base[cell.id].operators.filter((i) => i != operatorId),
    },
  }
}
