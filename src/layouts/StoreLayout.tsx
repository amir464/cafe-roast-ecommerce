import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function StoreLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-[var(--background)] text-[var(--text-primary)]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
