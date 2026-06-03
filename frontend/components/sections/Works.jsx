'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X } from 'lucide-react'
import { getWorks } from '@/lib/api'
import { fallbackWorks } from '@/lib/data'

const cats = ['All', 'Cinematography', 'Drone', 'Short Film', 'Content Creator', 'Editing']

/* ── Simple video thumbnail ── */
function VideoThumb({ src }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const handler = () => { v.currentTime = 1.5 }
    v.addEventListener('loadedmetadata', handler)
    return () => v.removeEventListener('loadedmetadata', handler)
  }, [src])

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="metadata"
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', display: 'block',
      }}
    />
  )
}

/* ── Modal ── */
function Modal({ work, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc) }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(13,20,32,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 900, position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: -38, right: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <X size={15} /> Close (Esc)
        </button>

        <div style={{ aspectRatio: '16/9', background: '#000', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(46,134,193,0.3)' }}>
          <video
            src={work.videoFile}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', display: 'block' }}
          />
        </div>

        <div style={{ background: '#fff', borderRadius: '0 0 4px 4px', padding: '14px 20px' }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#2e86c1', fontFamily: "'Space Grotesk',sans-serif" }}>{work.category}</span>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", margin: '4px 0' }}>{work.title}</h3>
          <p style={{ fontSize: 12, color: '#6a8aaa', margin: 0 }}>{work.description}</p>
          {work.tags && (
            <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
              {work.tags.map(t => (
                <span key={t} style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, border: '1px solid #c5ddf0', color: '#5dade2', background: 'rgba(46,134,193,0.06)', fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Work Card ── */
function WorkCard({ work, i, inView, onClick }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
        border: `1.5px solid ${hov ? '#2e86c1' : '#dce8f3'}`,
        boxShadow: hov ? '0 10px 32px rgba(46,134,193,0.14)' : '0 2px 8px rgba(26,35,50,0.06)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden', background: 'linear-gradient(135deg,#dce8f3,#e8f4fe)' }}>
        {work.videoFile ? (
          <VideoThumb src={work.videoFile} />
        ) : work.thumbnail ? (
          <img src={work.thumbnail} alt={work.title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 44, opacity: 0.2 }}>🎬</span>
          </div>
        )}
        {/* Play overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(26,35,50,0.5)', opacity: hov ? 1 : 0, transition: 'opacity 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid #fff', background: 'rgba(46,134,193,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: hov ? 'scale(1)' : 'scale(0.7)', transition: 'transform 0.22s' }}>
            <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
          </div>
        </div>

        {work.featured && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 3, background: '#2e86c1', color: '#fff', fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif" }}>Featured</div>
        )}
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 3, background: 'rgba(255,255,255,0.9)', color: '#2e86c1', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{work.category}</div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: hov ? '#2e86c1' : '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 6, transition: 'color 0.25s', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{work.title}</h3>
        <p style={{ fontSize: 12, color: '#7a9ab8', lineHeight: 1.6, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{work.description}</p>
        {work.tags && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {work.tags.slice(0, 3).map(t => (
              <span key={t} style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, border: '1px solid #c5ddf0', color: '#5dade2', background: 'rgba(46,134,193,0.06)', fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Section ── */
export default function Works() {
  const [ref, inView] = useInView({ threshold: 0.04, triggerOnce: true })
  const [works, setWorks]       = useState(fallbackWorks)
  const [cat, setCat]           = useState('All')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getWorks(cat)
      .then(r => { if (r.data?.length) setWorks(r.data); else setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat)) })
      .catch(() => setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat)))
  }, [cat])

  return (
    <>
      <section id="works" ref={ref} style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'block', marginBottom: 10, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#2e86c1', fontFamily: "'Space Grotesk',sans-serif" }}>Portfolio</span>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>My Works</h2>
            <p style={{ color: '#6a8aaa', fontSize: 14, maxWidth: 440, margin: '0 auto' }}>Click any card to watch — cinematic productions across multiple formats.</p>
            <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,#2e86c1,transparent)', borderRadius: 1, margin: '12px auto 0' }} />
          </motion.div>

          {/* Filter */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? '#2e86c1' : '#f0f4f8', color: cat === c ? '#fff' : '#5a7a9a',
                border: cat === c ? 'none' : '1.5px solid #dce8f3', padding: '7px 18px',
                cursor: 'pointer', borderRadius: 20, transition: 'all 0.25s',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: "'Space Grotesk',sans-serif",
                boxShadow: cat === c ? '0 4px 14px rgba(46,134,193,0.3)' : 'none',
              }}>{c}</button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="works-grid">
            {works.map((w, i) => (
              <WorkCard key={w._id || i} work={w} i={i} inView={inView} onClick={() => setSelected(w)} />
            ))}
          </motion.div>
        </div>

        <style>{`
          @media(max-width:900px){.works-grid{grid-template-columns:repeat(2,1fr) !important;}}
          @media(max-width:600px){.works-grid{grid-template-columns:1fr !important;}}
        `}</style>
      </section>

      <AnimatePresence>
        {selected && <Modal work={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
