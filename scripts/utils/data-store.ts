import { readFileSync } from 'node:fs'
import path from 'node:path'
import { BuildingDataSchema, CharacterTableSchema } from '@/shared/schemas'

const srcDir = path.resolve('tmp/gamedata')

function loadJSON(filename: string): unknown {
  return JSON.parse(readFileSync(path.join(srcDir, filename), 'utf-8'))
}

export const gamedata = {
  load: {
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
  },
  get: {
    /** Returns all character IDs registered in the in-game base. */
    characterIDs() {
      const data = gamedata.load.buildingData()
      return Object.keys(data.chars)
    },
    /** Returns all unique buff icon IDs. */
    buffIconIDs() {
      const data = gamedata.load.buildingData().buffs
      return [...new Set(Object.values(data).map((buff) => buff.skillIcon))]
    },
    /** Returns all base grid cells. */
    layoutSlots() {
      const data = gamedata.load.buildingData().layouts
      const latestVersion = Object.keys(data).reduce((latest, version) =>
        Number(version.slice(1)) > Number(latest.slice(1)) ? version : latest,
      )
      return data[latestVersion].slots
    },
  },
}
