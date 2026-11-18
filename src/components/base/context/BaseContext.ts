import type { BaseData } from '@/components/base/model/Base'
import { createContext, type Dispatch, type SetStateAction } from 'react'

interface BaseContextType {
  base: BaseData
  setBase: Dispatch<SetStateAction<BaseData>>
}

/**
 * React context object to pass implicit access to the base data
 */
export const BaseContext = createContext<BaseContextType | null>(null)
