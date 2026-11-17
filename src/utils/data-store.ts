/**
 * Paths to all operator avatars
 */
export const avatars = Object.values(
  import.meta.glob<string>('@/assets/avatars/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

/**
 * Returns the avatar image path for the given operator
 * @param operatorId Operator ID to match against avatar image filenames
 * @returns Path to the avatar image
 */
export function getAvatarPath(operatorId: string) {
  const path = avatars.find((imgPath) =>
    imgPath.endsWith(`/${operatorId}.png`),
  )
  if (!path) throw new Error(`Unable to find avatar file at "${operatorId}"!`)
  return path
}
