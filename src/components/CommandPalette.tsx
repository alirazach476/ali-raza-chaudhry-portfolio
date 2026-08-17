import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { RESUME_URL } from './ResumeButton'
import { PROFILE, SOCIALS } from '../data/content'

interface Command {
  id: string
  label: string
  group: string
  action: () => void
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

  const goHome = useCallback(
    (hash?: string) => {
      setOpen(false)
      navigate('/')
      if (hash) setTimeout(() => scrollTo(hash), 300)
    },
    [navigate]
  )

  const commands: Command[] = [
    { id: 'home', label: 'Go to Home', group: 'Navigation', action: () => goHome() },
    { id: 'about', label: 'About', group: 'Navigation', action: () => goHome('#about') },
    { id: 'skills', label: 'Skills', group: 'Navigation', action: () => goHome('#skills') },
    { id: 'experience', label: 'Experience', group: 'Navigation', action: () => goHome('#experience') },
    { id: 'work', label: 'Featured Projects', group: 'Navigation', action: () => goHome('#projects') },
    { id: 'ai', label: 'AI / Computer Vision', group: 'Navigation', action: () => goHome('#ai') },
    { id: 'services', label: 'Services', group: 'Navigation', action: () => goHome('#services') },
    { id: 'resume', label: 'Resume', group: 'Navigation', action: () => goHome('#resume') },
    { id: 'contact', label: 'Contact', group: 'Navigation', action: () => goHome('#contact') },
    {
      id: 'email',
      label: 'Copy Email',
      group: 'Actions',
      action: () => {
        navigator.clipboard.writeText(PROFILE.email)
        setOpen(false)
      },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      group: 'Links',
      action: () => {
        window.open(SOCIALS.linkedin, '_blank')
        setOpen(false)
      },
    },
    {
      id: 'github',
      label: 'Open GitHub',
      group: 'Links',
      action: () => {
        window.open(SOCIALS.github, '_blank')
        setOpen(false)
      },
    },
    {
      id: 'resume',
      label: 'Download Resume',
      group: 'Actions',
      action: () => {
        window.open(RESUME_URL, '_blank', 'noopener,noreferrer')
        setOpen(false)
      },
    },
  ]

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.group.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setSelected(0)
      }
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      }
      if (e.key === 'Enter' && filtered[selected]) {
        filtered[selected].action()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected])

  useEffect(() => setSelected(0), [query])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[15000] flex items-start justify-center pt-[15vh] px-4 bg-base/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="w-full max-w-lg glass rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands…"
              className="w-full px-5 py-4 bg-transparent text-text placeholder:text-text-muted border-b border-white/8 focus:outline-none"
            />
            <ul className="max-h-72 overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 ? (
                <li className="px-5 py-3 text-text-muted text-sm">No results</li>
              ) : (
                filtered.map((cmd, i) => (
                  <li key={cmd.id}>
                    <button
                      role="option"
                      aria-selected={i === selected}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full text-left px-5 py-2.5 flex items-center justify-between text-sm transition-colors ${
                        i === selected ? 'bg-violet/15 text-text' : 'text-text-muted hover:bg-white/5'
                      }`}
                    >
                      <span>{cmd.label}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-50">{cmd.group}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
            <div className="px-5 py-2 border-t border-white/8 text-[10px] text-text-muted flex gap-4">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
