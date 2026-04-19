import { z } from 'zod'

export type CharacterTable = z.infer<typeof CharacterTableSchema>
export const CharacterTableSchema = z.record(
  z.string(),
  z.object({ name: z.string() }),
)

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

export type ScriptResult = z.infer<typeof ScriptResultSchema>
export const ScriptResultSchema = z.object({
  status: z.string(),
  progress: z.string(),
  diffToTarget: z.number(),
  script: z.string(),
})
