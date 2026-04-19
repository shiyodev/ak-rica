import { mkdirSync, writeFileSync } from 'node:fs'
import { gamedata } from './utils/data_store'
import path, { dirname } from 'node:path'

const outFile = path.resolve('src/data', 'buffs.gen.json')
const buffs = gamedata.fetch.buildingData().buffs

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(buffs, null, 2))
