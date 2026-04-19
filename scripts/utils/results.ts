import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const destDir = path.resolve('scripts/.output')

/**
 * Saves the script result as JSON and prints it on the console
 * @param msg - Console message to be printed along status an progress
 * @param values - The reached is-value and the supposed target value if there is one
 * @param filePath - Path to the script file this function is called from
 */
export function processResult(
  msg: string,
  values: { isValue: number; target?: number },
  filePath: string,
) {
  const { isValue, target } = values
  const { name, base } = path.parse(filePath)

  // Logic-Flags
  const isComplete = isValue === (target ?? isValue)
  const progress = target === undefined ? `${isValue}` : `${isValue}/${target}`

  // JSON body
  const result = {
    status: isComplete ? '✅' : '❌',
    progress,
    diffToTarget: (target ?? isValue) - isValue,
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
