'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = navLinks.map(l => l.href.replace('#', ''))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.4s',
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 1px 24px rgba(46,134,193,0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(46,134,193,0.12)' : 'none',
          padding: scrolled ? '10px 0' : '20px 0',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <button onClick={() => go('#home')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#1a5f8a,#2e86c1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>ST</span>
            </div>
            <div className="logo-text">
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", letterSpacing: '0.04em' }}>Shriram Toksiya</div>
              <div style={{ fontSize: 9, color: '#2e86c1', letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>Cinematographer</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => go(link.href)}
                className={`nav-link ${active === link.href.replace('#','') ? 'active' : ''}`}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                  fontFamily: "'Space Grotesk',sans-serif",
                  color: active === link.href.replace('#','') ? '#2e86c1' : '#5a7a9a',
                  padding: '4px 0',
                }}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="desktop-nav">
            <button onClick={() => go('#contact')} className="btn-blue" style={{ padding: '8px 20px', fontSize: 10 }}>
              Hire Me
            </button>
          </div>

          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2e86c1', display: 'none' }} className="mobile-toggle">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <style>{`
          @media (min-width: 768px) { .logo-text { display: block !important; } }
          @media (max-width: 767px) { .desktop-nav { display: none !important; } .mobile-toggle { display: block !important; } .logo-text { display: none; } }
        `}</style>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            style={{ position: 'fixed', top: 58, left: 0, right: 0, zIndex: 40, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(46,134,193,0.12)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => go(link.href)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", color: active === link.href.replace('#','') ? '#2e86c1' : '#5a7a9a' }}>
                {link.label}
              </button>
            ))}
            <button onClick={() => go('#contact')} className="btn-blue" style={{ padding: '8px 24px', fontSize: 10, marginTop: 8 }}>Hire Me</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
