import { mkdirSync, readdirSync, rmSync } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { gamedata } from './utils/data-store'
import { processResult } from './utils/results'

const srcDir = path.resolve('tmp/assets')
const destDir = path.resolve('src/assets/avatars')

const characterIDs = gamedata.fetch.characterIDs()
const allAvatars = readdirSync(srcDir)

// Character avatars
const avatars = allAvatars.filter((a) =>
  characterIDs.includes(path.parse(a).name),
)

// Prepare output directory
rmSync(destDir, { recursive: true, force: true })
mkdirSync(destDir, { recursive: true })

// Copy character avatar files
try {
  await Promise.all(
    avatars.map((a) => copyFile(path.join(srcDir, a), path.join(destDir, a))),
  )
} catch (error) {
  console.error('Unable to copy character avatar\n', error)
}

processResult(
  'Processed operator avatars',
  { actual: readdirSync(destDir).length, target: characterIDs.length },
  import.meta.filename,
)
