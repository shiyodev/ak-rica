import { mkdirSync, writeFileSync } from 'node:fs'
import { gamedata } from './utils/data_store'
import path, { dirname } from 'node:path'
import { processResult } from './utils/results'

const outFile = path.resolve('src/data', 'buffs.gen.json')
const buffs = gamedata.fetch.buildingData().buffs

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(buffs, null, 2))

processResult('Base skills processed', { isValue: Object.values(buffs).length })
