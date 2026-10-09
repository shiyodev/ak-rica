import { readFileSync } from 'node:fs'
import path from 'node:path'
import { BuildingDataSchema, CharacterTableSchema } from '@/shared/schemas'

const srcDir = path.resolve('tmp/gamedata')

function loadJSON(filename: string): unknown {
  return JSON.parse(readFileSync(path.join(srcDir, filename), 'utf-8'))
}

export const gamedata = {
  fetch: {
    /** Returns all character data. */
    characterTable() {
      const raw = loadJSON('character_table.json')
      return CharacterTableSchema.parse(raw)
    },
    /** Returns all data regarding the in-game base. */
    buildingData() {
      const raw = loadJSON('building_data.json')
      return BuildingDataSchema.parse(raw)
    },
    /** Returns all character IDs registered in the in-game base. */
    characterIDs() {
      const data = gamedata.fetch.buildingData()
      return Object.keys(data.chars)
    },
  },
}
