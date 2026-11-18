import { layout } from '@/data/index.gen'

export const dimensions = Object.values(layout).reduce(
  (dimensions, cell) => ({
    colCount: Math.max(dimensions.colCount, cell.offset.col + cell.size.col),
    rowCount: Math.max(dimensions.rowCount, cell.offset.row + cell.size.row),
  }),
  { colCount: 0, rowCount: 0 },
)
