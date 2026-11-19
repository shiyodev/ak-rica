/**
 * Extracts the filestem from griven path
 * @param path Filepath to be parsed
 * @returns The extracted filestem
 */
export function getFilestem(path: string) {
  const filename = path.split('/').pop()
  const filestem = filename?.split('.')[0]

  if (!filestem) throw new Error(`"${path}" is not a valid filepath!`)
  return filestem
}
