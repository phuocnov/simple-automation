export function ErrorFallback({
  title = 'Something went wrong',
  onRetry,
}: {
  title?: string,
  onRetry?: () => void
}) {
  return (
    <div style={{ padding: 32 }}>
      <h2>{title}</h2>
      <p>Please try again.</p>
      {onRetry && (
        <button onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
