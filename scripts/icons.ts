import { mkdirSync, readdirSync, rmSync } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { gamedata } from './utils/data-store'
import { processResult } from './utils/results'

const srcDir = path.resolve('tmp/assets/skills')
const destDir = path.resolve('src/assets/skills')

const iconIDs = gamedata.fetch.buffIconIDs()
const allIcons = readdirSync(srcDir)

// Buff icons
const icons = allIcons.filter((i) => iconIDs.includes(path.parse(i).name))

// Prepare output directory
rmSync(destDir, { recursive: true, force: true })
mkdirSync(destDir, { recursive: true })

// Copy icons
try {
  await Promise.all(
    icons.map((i) => copyFile(path.join(srcDir, i), path.join(destDir, i))),
  )
} catch (error) {
  console.error('Unable to copy icon\n', error)
}

processResult(
  'Processed buff icons',
  { actual: readdirSync(destDir).length, target: iconIDs.length },
  import.meta.filename,
)
