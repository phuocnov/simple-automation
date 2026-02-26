import { Suspense, type JSX } from 'react'
import { ErrorBoundary } from './error-boundary'
import { ErrorFallback } from './error-fallback'
import PageLoader from '../components/page-loader'

export function withPageBoundary(
  element: JSX.Element,
  fallback?: JSX.Element
) {
  return (
    <ErrorBoundary fallback={fallback ?? <ErrorFallback />}>
      <Suspense fallback={<PageLoader />}>
        {element}
      </Suspense>
    </ErrorBoundary>
  )
}
