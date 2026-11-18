import type { BaseData } from '@/components/base/model/Base'
import { createContext } from 'react'

interface BaseContextType {
  base: BaseData
  setBase: (base: BaseData) => void
}

/**
 * React context object to pass implicit access to the base data
 */
export const BaseContext = createContext<BaseContextType | null>(null)
