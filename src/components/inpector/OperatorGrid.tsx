import type { BaseCell, BaseData } from '@/components/base/models/Base'
import { avatars, getAvatarPath } from '@/utils/avatars'
import { getFilestem } from '@/utils/utils'

export function OperatorGrid({
  cell,
  base,
  setBase,
}: {
  cell: BaseCell
  base: BaseData
  setBase: (base: BaseData) => void
}) {
  return (
    <div className="h-[50vh] overflow-y-auto">
      Selection
      <div className="grid gap-2 grid-cols-5">
        {base[cell.id].operators.map((op) => (
          <img
            key={op}
            src={getAvatarPath(op)}
            alt=""
            decoding="async"
            className="h-32 w-32 rounded"
            onClick={() =>
              setBase({
                ...base,
                [cell.id]: {
                  ...base[cell.id],
                  operators: base[cell.id].operators.filter((i) => i != op),
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
                [cell.id]: {
                  ...base[cell.id],
                  operators: [
                    ...base[cell.id].operators,
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
