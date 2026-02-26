import { Provider as ReduxProvider } from 'react-redux'
import { QueryProvider } from './query.provider'
import { store } from '../store/store'
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  )
}
