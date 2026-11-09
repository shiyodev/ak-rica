const images = Object.values(
  import.meta.glob<string>('@/assets/avatars/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

export function OperatorGrid() {
  return (
    <div className="h-[50vh] overflow-y-auto">
      <div className="grid gap-2 grid-cols-5">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-32 w-32 rounded"
          />
        ))}
      </div>
    </div>
  )
}
