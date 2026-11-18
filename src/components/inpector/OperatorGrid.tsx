import type { BaseData } from '@/components/base/models/Base'
import { avatars, getAvatarPath } from '@/utils/data-store'
import { getFilestem } from '@/utils/utils'

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
            src={getAvatarPath(op)}
            alt=""
            decoding="async"
            className="h-32 w-32 rounded"
            onClick={() =>
              setBase({
                ...base,
                [roomId]: {
                  ...base[roomId],
                  operators: base[roomId].operators.filter((i) => i != op),
                },
              })
            }
          />
        ))}
      </div>
      Operators
      <div className="grid gap-2 grid-cols-5">
        {avatars.map((avatarPath) => (
          <img
            key={avatarPath}
            src={avatarPath}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-32 w-32 rounded"
            onClick={() =>
              setBase({
                ...base,
                [roomId]: {
                  ...base[roomId],
                  operators: [
                    ...base[roomId].operators,
                    getFilestem(avatarPath),
                  ],
                },
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
