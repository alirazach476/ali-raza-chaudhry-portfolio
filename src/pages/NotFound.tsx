import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MagneticButton } from '../components/MagneticButton'

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-cyan mb-4">404</p>
        <h1 className="font-display text-5xl md:text-7xl gradient-text mb-4">Lost in the void.</h1>
        <p className="text-text-muted max-w-md mx-auto mb-10">
          This page doesn't exist — but plenty of great work does. Head back home.
        </p>
        <Link to="/">
          <MagneticButton>Back Home</MagneticButton>
        </Link>
      </motion.div>
    </div>
  )
}
