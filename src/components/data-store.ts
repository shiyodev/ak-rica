export const avatars = Object.values(
  import.meta.glob<string>('@/assets/avatars/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

export function getAvatar(operatorName: string) {
  const avatar = avatars.find((img) => img.includes(operatorName))
  if (avatar) return avatar
  throw new Error(`Unable to find an Avatar for ${operatorName}!`)
}
