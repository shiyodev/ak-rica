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
export function getAvatar(operatorName: string) {
  const avatar = avatars.find((img) => img.includes(operatorName))
  if (avatar) return avatar
  throw new Error(`Unable to find an Avatar for ${operatorName}!`)
}
