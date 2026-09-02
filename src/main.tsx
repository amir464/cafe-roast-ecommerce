import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/vazirmatn'
import './index.css'
import './theme.css'
import App from './App.tsx'
import { AppProvider } from './contexts/AppProvider'
import { ThemeControl } from './components/ThemeControl.tsx'

const initialTheme =
  localStorage.getItem('caferoast_theme') === 'light'
    ? 'light'
    : 'dark'
document.documentElement.classList.add(initialTheme)
document.documentElement.style.colorScheme = initialTheme

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <ThemeControl />
      <App />
    </AppProvider>
  </StrictMode>,
)
