import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from './app/providers/index.tsx'
import { AppRouter } from './app/router/index.tsx'
import { ErrorBoundary } from './shared/error/error-boundary.tsx'
import { ErrorFallback } from './shared/error/error-fallback.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
)
