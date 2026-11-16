import type { BaseData } from '@/components/Base'
import { getAvatar } from '@/components/data-store'

const images = Object.values(
  import.meta.glob<string>('@/assets/avatars/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

export function OperatorGrid({
  roomId,
  base,
  setBase,
}: {
  roomId: string
  base: BaseData
  setBase: (base: BaseData) => void
}) {
  return (
    <div className="h-[50vh] overflow-y-auto">
      Selection
      <div className="grid gap-2 grid-cols-5">
        {base[roomId].operators.map((op) => (
          <img
            key={op}
            src={getAvatar(op)}
            alt=""
            decoding="async"
            className="h-32 w-32 rounded"
          />
        ))}
      </div>
      Operators
      <div className="grid gap-2 grid-cols-5">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-32 w-32 rounded"
            onClick={() =>
              setBase({
                ...base,
                [roomId]: {
                  ...base[roomId],
                  operators: [...base[roomId].operators, img],
                },
              })
            } //TODO: display neatly. make searchable => prototype of base grid done => refactor
          />
        ))}
      </div>
    </div>
  )
}
