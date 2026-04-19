import { z } from 'zod'

export type BuildingData = z.infer<typeof BuildingDataSchema>
export const BuildingDataSchema = z.object({
  chars: z.record(
    z.string(),
    z.object({
      buffChar: z.array(
        z.object({
          buffData: z
            .array(
              z.object({
                buffId: z.string(),
                cond: z.object({ phase: z.string(), level: z.number() }),
              }),
            )
            .catch([]),
        }),
      ),
    }),
  ),
  buffs: z.record(
    z.string(),
    z.object({
      buffId: z.string(),
      buffName: z.string(),
      buffIcon: z.string(),
      skillIcon: z.string(),
      sortId: z.number(),
      buffColor: z.string(),
      textColor: z.string(),
      buffCategory: z.string(),
      roomType: z.string(),
      description: z.string(),
      efficiency: z.number(),
      targetGroupSortId: z.number(),
      targets: z.array(z.number()).catch([]),
    }),
  ), //* Those are all properties. not all of them might be needed
})
