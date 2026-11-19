import { BaseGrid } from '@/components/base/BaseGrid'
import type { BaseCell } from '@/components/base/models/Base'
import { GitHubButton } from '@/components/GitHubButton'
import { CellInspector } from '@/components/inpector/RoomInspector'
import { useState } from 'react'

export default function App() {
  const [selectedCell, setSelectedCell] = useState<BaseCell | null>(null)

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <GitHubButton />
      <BaseGrid onCellSelect={setSelectedCell} />
      <CellInspector cell={selectedCell} onClose={() => setSelectedCell(null)} />
    </main>
  )
}
