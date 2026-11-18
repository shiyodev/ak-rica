import { BaseGrid } from '@/components/base/BaseGrid'
import { RoomDetails } from '@/components/base/RoomDetails'
import { GitHubButton } from '@/components/GitHubButton'
import { layout } from '@/data/index.gen'
import { useState } from 'react'

export default function App() {
  const [room, setRoom] = useState<(typeof layout)[keyof typeof layout] | null>(
    null,
  )

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <GitHubButton />
      <BaseGrid onSelect={setRoom} />
      <RoomDetails room={room} onClose={() => setRoom(null)} />
    </main>
  )
}
