import { mkdirSync, writeFileSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { gamedata } from './utils/data-store'
import { processResult } from './utils/results'

const outFile = path.resolve('src/data', 'buffs.gen.json')
const buffs = gamedata.fetch.buildingData().buffs

// Write JSON
mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(buffs, null, 2))

processResult(
  'Base skills processed',
  { actual: Object.values(buffs).length },
  import.meta.filename,
)
