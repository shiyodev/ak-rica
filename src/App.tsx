import { BaseGrid } from '@/components/base/BaseGrid'
import { GitHubButton } from '@/components/GitHubButton'
import { RoomInspector } from '@/components/inpector/RoomInspector'
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
      <RoomInspector room={room} onClose={() => setRoom(null)} />
    </main>
  )
}
