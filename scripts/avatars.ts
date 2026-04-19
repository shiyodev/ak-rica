import { mkdirSync, readdirSync, rmSync } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { gamedata } from './utils/data_store'
import { processResult } from './utils/results'

const srcDir = path.resolve('data/ArknightsAssets2/assets/dyn/arts/charavatars')
const destDir = path.resolve('public/img/avatars')

const characterIDs = gamedata.fetch.characterIDs()
const allAvatars = readdirSync(srcDir)

// Avatar lists to copy
const avatars = allAvatars.filter((a) =>
  characterIDs.includes(path.parse(a).name),
)
const seperateAvatars = [
  { filename: 'char_271_spikes.png', srcFile: 'elite/char_271_spikes.png' },
]

// Prepare output directory
rmSync(destDir, { recursive: true, force: true })
mkdirSync(destDir, { recursive: true })

// Copy character avatar files
try {
  await Promise.all(
    avatars.map((a) => copyFile(path.join(srcDir, a), path.join(destDir, a))),
  )
  await Promise.all(
    seperateAvatars.map((a) =>
      copyFile(path.join(srcDir, a.srcFile), path.join(destDir, a.filename)),
    ),
  )
} catch (error) {
  console.error('Unable to copy character avatar\n', error)
}

processResult(
  'Processed operator avatars',
  { isValue: readdirSync(destDir).length, target: characterIDs.length },
  import.meta.filename,
)
