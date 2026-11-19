import { readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const dataDir = path.resolve('src/data')
const files = readdirSync(dataDir)
  .filter((file) => file.endsWith('.gen.json'))
  .sort()

const exports = files.map((file) => {
  const name = file.slice(0, -'.gen.json'.length)

  if (!/^[A-Za-z_$][\w$]*$/.test(name))
    throw new Error(`Cannot use '${file}' as a named export!`)

  return `export { default as ${name} } from './${file}'`
})

writeFileSync(path.join(dataDir, 'index.gen.ts'), `${exports.join('\n')}\n`)
