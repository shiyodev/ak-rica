import { Button } from '@/components/ui/button'

// TODO: Move to the sidebar component.
export function GitHubButton() {
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
