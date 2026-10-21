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
      charId: z.string(),
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
      skillIcon: z.string(),
      buffCategory: z.string(), //* Might be redundant
      roomType: z.string(),
      description: z.string(),
      efficiency: z.number(), //* Might be redundant
      targetGroupSortId: z.number(), //* Might be redundant
      targets: z.array(z.string()).catch([]),
    }),
  ),
})

export type ScriptResult = z.infer<typeof ScriptResultSchema>
export const ScriptResultSchema = z.object({
  status: z.string(),
  progress: z.string(),
  diff: z.number().or(z.string()),
  script: z.string(),
})
