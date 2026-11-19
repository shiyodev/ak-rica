import { mkdirSync, writeFileSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { gamedata } from '@/scripts/utils/data-store'
import { processResult } from '@/scripts/utils/results'

const outFile = path.resolve('src/data', 'buffs.gen.json')
const { buffs, chars } = gamedata.load.buildingData()

// Get target value
const buffIds = Object.values(chars)
  .flatMap(({ buffChar }) => buffChar)
  .flatMap(({ buffData }) => buffData)
  .map(({ buffId }) => buffId)

// Write JSON
mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(buffs, null, 2) + '\n')

processResult(
  'Base skills processed',
  { actual: Object.values(buffs).length, target: new Set(buffIds).size },
  import.meta.filename,
)
