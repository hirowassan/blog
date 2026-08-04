import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/router'
import { ThemeProvider } from '@/theme/ThemeProvider'

/** Composition root: routing and theme context wrap the whole app. */
export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}
