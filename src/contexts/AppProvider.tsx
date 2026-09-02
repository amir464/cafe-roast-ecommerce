import type { ReactNode } from 'react'

import { ThemeProvider } from './ThemeContext'
import { AuthProvider } from './AuthContext'
import { StoreProvider } from './StoreContext'

export function AppProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StoreProvider>
          {children}
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
