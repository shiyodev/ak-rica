export function processResult(
  msg: string,
  values: { isValue: number; target?: number }
) {
  const { isValue, target } = values
  const progress = target === undefined ? `${isValue}` : `${isValue}/${target}`
  console.log(`[${progress}] ${msg}`)
}
