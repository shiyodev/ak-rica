import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import * as core from '@actions/core'
import { ScriptResultSchema } from '@shared/schemas'

const srcDir = path.resolve('scripts/.output')

// Check script conditions
if (!process.env.GITHUB_STEP_SUMMARY) process.exit()
if (!existsSync(srcDir)) {
  console.log('No script results to summerize')
  process.exit()
}

// Write table body
const resultFiles = readdirSync(srcDir)
const tableBody = resultFiles.map((file) => {
  const raw = JSON.parse(readFileSync(path.join(srcDir, file), 'utf-8'))
  const result = ScriptResultSchema.parse(raw)
  return [
    result.status,
    result.progress,
    result.diffToTarget.toString(),
    result.script,
  ]
})

// Create table
await core.summary
  .addHeading('Script Results')
  .addTable([
    [
      { data: 'Status', header: true },
      { data: 'Progress', header: true },
      { data: 'Missing Items', header: true },
      { data: 'Script', header: true },
    ],
    ...tableBody,
  ])
  .write()
