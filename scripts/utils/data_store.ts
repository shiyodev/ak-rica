import { readFileSync } from 'node:fs'
import path from 'node:path'
import { BuildingDataSchema, CharacterTableSchema } from '@shared/schemas'

const srcDir = path.resolve('data/ArknightsGamedata/en/gamedata/excel')

function loadJSON(filename: string) {
  return JSON.parse(readFileSync(path.join(srcDir, filename), 'utf-8'))
}

export const gamedata = {
  fetch: {
    characterTable() {
      const raw = loadJSON('character_table.json')
      return CharacterTableSchema.parse(raw)
    },
    buildingData() {
      const raw = loadJSON('building_data.json')
      return BuildingDataSchema.parse(raw)
    },
    characterIDs() {
      return Object.keys(gamedata.fetch.buildingData().chars)
    },
  },
}
