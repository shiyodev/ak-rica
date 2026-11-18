import { BaseContext } from '@/components/base/context/BaseContext'
import { useContext } from 'react'

/**
 * @throws Error if called not within the context of {@link BaseContext}
 * @returns An object containing the state of the base and the ability to mutate it.
 */
export function useBase() {
  const context = useContext(BaseContext)

  if (!context) throw new Error('useBase must be used inside BaseProvider')
  return context
}
