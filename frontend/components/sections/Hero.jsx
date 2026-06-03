'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'

const roles = ['Cinematographer', 'Video Editor', 'Drone Pilot', 'Color Artist', 'Visual Storyteller']

export default function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % roles.length), 2800)
    return () => clearInterval(t)
  }, [])
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* BG Video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          poster="https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1920&q=80">
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,35,50,0.62)' }} />
        <div className="video-overlay" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,35,50,0.7) 0%, transparent 45%, transparent 55%, rgba(26,35,50,0.5) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to top, #1a2332, transparent)' }} />
      </div>

      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #2e86c1, #5dade2, transparent)', zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 900, margin: '0 auto', padding: '80px 24px 0', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-dark"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 22px', marginBottom: 32, borderRadius: 30 }}>
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <span className="pulse-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#5dade2', opacity: 0.5 }} />
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#5dade2', position: 'relative' }} />
          </span>
          <span style={{ color: '#5dade2', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>
            Available for Projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: 16 }}>
          <span style={{ display: 'block', fontSize: 'clamp(3rem,9vw,7.5rem)', color: '#ffffff' }}>Shriram</span>
          <span className="shimmer-text" style={{ display: 'block', fontSize: 'clamp(3rem,9vw,7.5rem)' }}>Toksiya</span>
        </motion.h1>

        {/* Role */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
          <motion.span key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.42 }}
            style={{ fontSize: 'clamp(14px,2vw,20px)', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7ec8e3', fontStyle: 'italic', fontFamily: "'Playfair Display',serif" }}>
            {roles[idx]}
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.75 }}>
          Crafting cinematic stories through light, motion, and emotion.<br />
          Five years of professional filmmaking — frame by frame.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}>
          <button onClick={() => scrollTo('works')} className="btn-blue">
            <Play size={12} fill="#fff" /> View My Work
          </button>
          <button onClick={() => scrollTo('contact')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.5)', padding: '0.85rem 1.8rem', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Space Grotesk',sans-serif", cursor: 'pointer', borderRadius: 1, transition: 'border-color 0.25s, color 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#5dade2'; e.currentTarget.style.color = '#5dade2' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#ffffff' }}>
            Get In Touch
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.38 }}
          className="glass-dark" style={{ display: 'inline-flex', alignItems: 'stretch', borderRadius: 2 }}>
          {[{ v: '5+', l: 'Years' }, { v: '200+', l: 'Projects' }, { v: '50+', l: 'Clients' }, { v: '15+', l: 'Awards' }].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <span className="accent-text" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, fontFamily: "'Playfair Display',serif" }}>{s.v}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10 }}>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Space Grotesk',sans-serif" }}>Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} color="#5dade2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
