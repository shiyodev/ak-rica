import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import * as core from '@actions/core'
import { ScriptResultSchema } from '@/shared/schemas'

const srcDir = path.resolve('tmp/script-results')

if (!existsSync(srcDir)) {
  console.log('No script results to summerize')
  process.exit()
}

// Set table order
const tableOrder: Record<string, number> = {
  '❌': 0,
  '🔵': 1,
  '✅': 2,
}

// Write table body
const resultFiles = readdirSync(srcDir)
const tableBody = resultFiles
  .map((file) => {
    const raw = JSON.parse(
      readFileSync(path.join(srcDir, file), 'utf-8'),
    ) as unknown
    return ScriptResultSchema.parse(raw)
  })
  .sort(
    (a, b) =>
      tableOrder[a.status] - tableOrder[b.status] ||
      a.script.localeCompare(b.script),
  )
  .map((result) => [
    result.status,
    result.progress,
    result.diff.toString(),
    result.script,
  ])

// Print table
console.table(
  tableBody.map(([status, progress, diff, script]) => ({
    Status: status,
    Progress: progress,
    'Missing Items': diff,
    Script: script,
  })),
)

// Create GitHub table
if (process.env.GITHUB_STEP_SUMMARY)
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
