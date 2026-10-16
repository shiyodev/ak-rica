import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const destDir = path.resolve('tmp/script-results')

/**
 * Saves the result as JSON and prints the result on the console
 * @param msg - Console message to be printed along status and progress
 * @param values - The actual value and the target value if there is one
 * @param filePath - Path to the script file of the function caller
 */
export function processResult(
  msg: string,
  values: { actual: number; target?: number },
  filePath: string,
) {
  const { actual, target } = values
  const { name, base } = path.parse(filePath)

  // Logic-Flags
  const isSuccess = target === undefined || actual === target
  const progress = target === undefined ? `${actual}` : `${actual}/${target}`

  // JSON body
  const result = {
    status: isSuccess ? '✅' : '❌',
    progress,
    diff: (target ?? actual) - actual,
    script: base,
  }

  // fs operations
  mkdirSync(destDir, { recursive: true })
  writeFileSync(
    path.join(destDir, `${name}.json`),
    JSON.stringify(result, null, 2),
  )

  console.log(`${result.status} [${progress}] ${msg}`)
}
