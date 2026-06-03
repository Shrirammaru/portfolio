'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X, ExternalLink } from 'lucide-react'
import { getWorks } from '@/lib/api'
import { fallbackWorks } from '@/lib/data'

const cats = ['All', 'Cinematography', 'Drone', 'Short Film', 'Content Creator', 'Editing']

/* ── Modal with Drive iframe ── */
function Modal({ work, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc) }
  }, [onClose])

  const driveViewUrl = work.driveId
    ? `https://drive.google.com/file/d/${work.driveId}/view`
    : work.videoUrl

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(13,20,32,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 900, position: 'relative' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#5dade2', fontFamily: "'Space Grotesk',sans-serif" }}>{work.category}</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display',serif", margin: '2px 0 0' }}>{work.title}</h3>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {/* Open in Drive button */}
            <a href={driveViewUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(46,134,193,0.15)', border: '1px solid rgba(46,134,193,0.4)', color: '#5dade2', padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 600, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", cursor: 'pointer' }}>
              <ExternalLink size={12} /> Open in Drive
            </a>
            <button onClick={onClose}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, padding: '6px 12px', borderRadius: 4 }}>
              <X size={12} /> Close
            </button>
          </div>
        </div>

        {/* iframe container */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(46,134,193,0.25)' }}>

          {/* Loading state */}
          {!iframeLoaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0d1520', gap: 16 }}>
              <div style={{ width: 36, height: 36, border: '3px solid #2e86c1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: "'DM Sans',sans-serif" }}>Loading video...</p>
              <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
            </div>
          )}

          <iframe
            src={work.videoUrl}
            title={work.title}
            onLoad={() => setIframeLoaded(true)}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              border: 'none',
              opacity: iframeLoaded ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 8, textAlign: 'center', fontFamily: "'DM Sans',sans-serif" }}>
          {work.description} &nbsp;·&nbsp; If video doesn't load,
          <a href={driveViewUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#5dade2', textDecoration: 'none', marginLeft: 4 }}>click here to watch</a>
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ── Work Card ── */
function WorkCard({ work, i, inView, onClick }) {
  const [hov, setHov] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const thumbUrl = work.driveId
    ? `https://drive.google.com/thumbnail?id=${work.driveId}&sz=w800`
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
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
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#1a2332', overflow: 'hidden' }}>

        {/* Drive thumbnail */}
        {thumbUrl && !imgErr && (
          <img src={thumbUrl} alt={work.title} onError={() => setImgErr(true)}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transition: 'transform 0.4s',
              transform: hov ? 'scale(1.05)' : 'scale(1)',
            }} />
        )}

        {/* Fallback */}
        {(!thumbUrl || imgErr) && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a2332,#2e4a6a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 48, opacity: 0.2 }}>🎬</span>
          </div>
        )}

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,35,50,0.65) 0%, rgba(26,35,50,0.08) 60%)' }} />

        {/* Play button */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.9)',
            background: hov ? 'rgba(46,134,193,0.92)' : 'rgba(46,134,193,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hov ? 'scale(1.12)' : 'scale(1)',
            transition: 'all 0.25s',
            boxShadow: hov ? '0 4px 20px rgba(46,134,193,0.5)' : 'none',
          }}>
            <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
          </div>
        </div>

        {/* Badges */}
        {work.featured && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#2e86c1', color: '#fff', fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif" }}>Featured</div>
        )}
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.9)', color: '#2e86c1', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{work.category}</div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: hov ? '#2e86c1' : '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 6, transition: 'color 0.25s', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {work.title}
        </h3>
        <p style={{ fontSize: 12, color: '#7a9ab8', lineHeight: 1.6, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {work.description}
        </p>
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
      .then(r => {
        if (r.data?.length) setWorks(r.data)
        else setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat))
      })
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="works-grid">
            {works.map((w, i) => (
              <WorkCard key={w._id || i} work={w} i={i} inView={inView} onClick={() => setSelected(w)} />
            ))}
          </div>
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
