import { mkdirSync, writeFileSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { gamedata } from '@/scripts/utils/data-store'
import { processResult } from '@/scripts/utils/results'

const outFile = path.resolve('src/data', 'rooms.gen.json')
const { rooms } = gamedata.load.buildingData()

// Edit Data
rooms['ELEVATOR'].category = 'ELEVATOR'
rooms['CORRIDOR'].category = 'CORRIDOR'
rooms['PRIVATE'].phases.forEach((phase) => (phase.maxStationedNum = 1))

// Write JSON
mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(rooms, null, 2) + '\n')

processResult(
  'Processed room data',
  { actual: Object.values(rooms).length },
  import.meta.filename,
)
// TODO: maybe add room data (below layout section in raw data)
