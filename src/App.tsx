import { BaseGrid } from '@/components/base/BaseGrid'
import type { CellId } from '@/components/base/models/Base'
import { GitHubButton } from '@/components/GitHubButton'
import { CellInspector } from '@/components/inspector/CellInspector'
import { useState } from 'react'

export default function App() {
  const [selectedCellId, setSelectedCellId] = useState<CellId | null>(null)

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <GitHubButton />
      <BaseGrid onCellSelect={setSelectedCellId} />
      <CellInspector cellId={selectedCellId} onClose={() => setSelectedCellId(null)} />
    </main>
  )
}
