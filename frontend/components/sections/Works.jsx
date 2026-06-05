'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'
import { fallbackWorks } from '@/lib/data'

const cats = ['All', 'Cinematography', 'Drone', 'Commercial', 'Short Film', 'Content Creator', 'Editing']

// YouTube play SVG
const PlayIcon = () => (
  <svg viewBox="0 0 68 48" width="56" height="40">
    <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C56 0 34 0 34 0S12 0 7.5 1.7a8.5 8.5 0 0 0-6 6C0 12.1 0 24 0 24s0 11.9 1.5 16.3a8.5 8.5 0 0 0 6 6C12 48 34 48 34 48s22 0 26.5-1.7a8.5 8.5 0 0 0 6-6C68 35.9 68 24 68 24s0-11.9-1.5-16.3z" fill="#ff0000"/>
    <path d="M27 34l18-10-18-10v20z" fill="#fff"/>
  </svg>
)

function WorkCard({ work, i, inView }) {
  const [hov, setHov] = useState(false)
  const [err, setErr]  = useState(false)

  const thumb = err
    ? work.thumbnail?.replace('maxresdefault', 'hqdefault')
    : work.thumbnail

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: hov
          ? '0 20px 50px rgba(26,35,50,0.18), 0 0 0 2px #2e86c1'
          : '0 4px 16px rgba(26,35,50,0.09)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {/* ── Thumbnail ── */}
      <a
        href={work.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', position: 'relative', paddingTop: '56.25%', overflow: 'hidden', background: '#0d1a2a', textDecoration: 'none' }}
      >
        {/* Thumbnail image */}
        {thumb && (
          <img
            src={thumb}
            alt={work.title}
            onError={() => setErr(true)}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s, filter 0.5s',
              transform: hov ? 'scale(1.07)' : 'scale(1)',
              filter: hov ? 'brightness(0.65)' : 'brightness(0.85)',
            }}
          />
        )}

        {/* No thumbnail fallback */}
        {!thumb && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg,#0d1a2a 0%,#1a3a5a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 52, opacity: 0.15 }}>🎬</span>
          </div>
        )}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(to top, rgba(13,26,42,0.9) 0%, transparent 100%)',
        }} />

        {/* Play button */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hov ? 1 : 0.85,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            transform: hov ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.3s',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          }}>
            <PlayIcon />
          </div>
        </div>

        {/* Category pill */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: '#2e86c1',
          color: '#fff',
          fontSize: 9, fontWeight: 800,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: 20,
          fontFamily: "'Space Grotesk',sans-serif",
        }}>
          {work.category}
        </div>

        {/* Featured badge */}
        {work.featured && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: 9, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.3)',
            fontFamily: "'Space Grotesk',sans-serif",
          }}>
            ⭐ Featured
          </div>
        )}

        {/* Title overlay at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
          <h3 style={{
            margin: 0,
            fontSize: 15, fontWeight: 700,
            color: '#ffffff',
            fontFamily: "'Playfair Display',serif",
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {work.title}
          </h3>
        </div>
      </a>

      {/* ── Card body ── */}
      <div style={{ padding: '16px 18px 18px' }}>
        <p style={{
          fontSize: 12, color: '#6a8aaa', lineHeight: 1.7,
          marginBottom: 14,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {work.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {work.tags?.map(t => (
            <span key={t} style={{
              fontSize: 9, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '3px 9px', borderRadius: 20,
              border: '1px solid #c5ddf0',
              color: '#3a7db5', background: 'rgba(46,134,193,0.07)',
              fontFamily: "'Space Grotesk',sans-serif",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Watch button */}
        <a
          href={work.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '9px 0',
            background: hov ? '#2e86c1' : '#f0f7ff',
            color: hov ? '#fff' : '#2e86c1',
            border: '1.5px solid #2e86c1',
            borderRadius: 8,
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: "'Space Grotesk',sans-serif",
            textDecoration: 'none',
            transition: 'all 0.28s',
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 2.8 12 2.8 12 2.8s-4.1 0-6.8.2c-.6 0-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.7 12 21.7 12 21.7s4.1 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7z"/>
            <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="white"/>
          </svg>
          Watch on YouTube
          <ExternalLink size={11} />
        </a>
      </div>
    </motion.div>
  )
}

export default function Works() {
  const [ref, inView] = useInView({ threshold: 0.04, triggerOnce: true })
  const [works, setWorks] = useState(fallbackWorks)
  const [cat, setCat]     = useState('All')

  useEffect(() => {
    setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat))
  }, [cat])

  return (
    <section id="works" ref={ref} style={{ padding: '96px 0', background: '#f0f4f8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <span style={{ display: 'block', marginBottom: 10, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#2e86c1', fontFamily: "'Space Grotesk',sans-serif" }}>
            Portfolio
          </span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>
            My Works
          </h2>
          <p style={{ color: '#6a8aaa', fontSize: 14, maxWidth: 480, margin: '0 auto' }}>
            A selection of cinematic productions — click any card to watch on YouTube.
          </p>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,#2e86c1,transparent)', borderRadius: 1, margin: '14px auto 0' }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 44 }}
        >
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? '#2e86c1' : '#ffffff',
              color: cat === c ? '#fff' : '#5a7a9a',
              border: cat === c ? 'none' : '1.5px solid #dce8f3',
              padding: '8px 20px', cursor: 'pointer', borderRadius: 24,
              transition: 'all 0.25s',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: "'Space Grotesk',sans-serif",
              boxShadow: cat === c ? '0 4px 14px rgba(46,134,193,0.35)' : '0 2px 6px rgba(26,35,50,0.06)',
            }}>
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="works-grid">
          {works.map((w, i) => (
            <WorkCard key={w._id || i} work={w} i={i} inView={inView} />
          ))}
        </div>

        {works.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#8aaac8', fontSize: 14 }}>
            No works in this category yet.
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:960px){.works-grid{grid-template-columns:repeat(2,1fr) !important;}}
        @media(max-width:580px){.works-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  )
}
