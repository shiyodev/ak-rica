import { mkdirSync, writeFileSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { gamedata } from '@/scripts/utils/data-store'
import { processResult } from '@/scripts/utils/results'

const outFile = path.resolve('src/data', 'layout.gen.json')
const cells = gamedata.get.layoutSlots()

// Get target value
const highestSlotId = Object.values(cells).reduce(
  (highest, { id }) => Math.max(highest, Number(id.slice('slot_'.length))),
  0,
)

// Write JSON
mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(cells, null, 2) + '\n')

processResult(
  'Processed base layout',
  { actual: Object.values(cells).length, target: highestSlotId },
  import.meta.filename,
)
