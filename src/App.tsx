import { Button } from '@/components/ui/button'

function GitHubButton() {
  return (
    <Button
      render={
        <a
          href="https://github.com/shiyodev/ak-rica"
          target="_blank"
          rel="noreferrer"
        />
      }
    >
      <svg className="button-icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#github-icon"></use>
      </svg>
      GitHub
    </Button>
  )
}

export default function App() {
  return (
    <main className="dark min-h-screen bg-background text-foreground flex justify-center">
      <GitHubButton />
    </main>
  )
}
