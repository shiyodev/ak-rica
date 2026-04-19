import path from 'node:path'
import { gamedata } from './utils/data_store'
import { writeFileSync } from 'node:fs'

const outFile = path.resolve('src/data', 'operators.gen.json')

const chars = gamedata.fetch.buildingData().chars
const charNameMap = gamedata.fetch.characterTable()

// Build raw JSON data
const data: Record<string, { name: string; buffs: object }> = {}
for (const [id, { buffChar }] of Object.entries(chars)) {
  data[id] = {
    name: charNameMap[id].name,
    buffs: buffChar,
  }
}

// Write JSON
writeFileSync(outFile, JSON.stringify(data, null, 2))
