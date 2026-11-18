import { BaseContext } from '@/components/base/context/BaseContext'
import { initBase } from '@/components/base/utils/initBase'
import { useState, type ReactNode } from 'react'

/**
 * Manages the state of the base and provides access to the base data
 * @returns Implicit access to {@link BaseContext} for all react JSX children
 */
export function BaseProvider({ children }: { children: ReactNode }) {
  const [base, setBase] = useState(initBase)

  return (
    <BaseContext.Provider value={{ base, setBase }}>
      {children}
    </BaseContext.Provider>
  )
}
