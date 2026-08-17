import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { PageTransition } from './components/PageTransition'
import { SmoothScrollProvider } from './providers/SmoothScrollProvider'
import { useScrollRefresh } from './hooks/useScrollRefresh'
import { HomePage } from './pages/HomePage'
import { NotFound } from './pages/NotFound'
import { JsonLd } from './components/JsonLd'

const CustomCursor = lazy(() =>
  import('./components/CustomCursor').then((m) => ({ default: m.CustomCursor }))
)
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
)
const BackToTop = lazy(() =>
  import('./components/BackToTop').then((m) => ({ default: m.BackToTop }))
)

function AppRoutes() {
  const location = useLocation()
  const [loaded, setLoaded] = useState(false)
  const [deferUi, setDeferUi] = useState(false)
  useScrollRefresh()

  useEffect(() => {
    if (!loaded) return
    let cancelled = false
    const enable = () => {
      if (!cancelled) setDeferUi(true)
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(enable, { timeout: 1500 })
      return () => {
        cancelled = true
        win.cancelIdleCallback?.(id)
      }
    }

    const id = setTimeout(enable, 800)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [loaded])

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      {deferUi && (
        <Suspense fallback={null}>
          <CustomCursor />
          <CommandPalette />
          <BackToTop />
        </Suspense>
      )}
      <ScrollProgress />
      <Nav />
      <div className="grain-overlay" aria-hidden="true" />
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageTransition>
                <main>
                  <HomePage />
                </main>
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <main>
                  <NotFound />
                </main>
              </PageTransition>
            }
          />
        </Routes>
      </PageTransition>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <JsonLd />
        <AppRoutes />
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}

export default App
