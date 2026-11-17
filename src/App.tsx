import { BaseGrid } from '@/components/base/BaseGrid'
import type { BaseData } from '@/components/base/model/Base'
import { RoomDetails } from '@/components/base/RoomDetails'
import { initBase } from '@/components/base/utils/initBase'
import { GitHubButton } from '@/components/GitHubButton'
import { layout } from '@/data/index.gen'
import { useState } from 'react'

export default function App() {
  const [room, setRoom] = useState<(typeof layout)[keyof typeof layout] | null>(null)
  const [base, setBase] = useState<BaseData>(initBase())

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <GitHubButton />
      <BaseGrid base={base} onSelect={setRoom} />
      <RoomDetails room={room} base={base} onSelect={setBase} onClose={() => setRoom(null)} />
    </main>
  )
}
