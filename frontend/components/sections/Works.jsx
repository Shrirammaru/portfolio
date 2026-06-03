'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X } from 'lucide-react'
import { getWorks } from '@/lib/api'
import { fallbackWorks } from '@/lib/data'

const cats = ['All', 'Cinematography', 'Drone', 'Commercial', 'Short Film', 'Content Creator', 'Editing']

/* Generates a thumbnail from a local video file using canvas */
function VideoThumb({ src, alt, hovered }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    const video = document.createElement('video')
    video.src = src
    video.crossOrigin = 'anonymous'
    video.muted = true
    video.preload = 'metadata'
    video.currentTime = 1.5
    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width  = video.videoWidth  || 640
        canvas.height = video.videoHeight || 360
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        setThumb(canvas.toDataURL('image/jpeg', 0.85))
      } catch {}
    })
    video.load()
  }, [src])

  if (thumb) {
    return (
      <img src={thumb} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.06)' : 'scale(1)', display: 'block' }} />
    )
  }

  // Fallback while thumbnail loads — show a video element at 1s
  return (
    <video
      src={src}
      muted playsInline preload="metadata"
      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      onLoadedMetadata={e => { e.target.currentTime = 1.5 }}
    />
  )
}

function Modal({ work, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc) }
  }, [onClose])

  const src = work.videoFile || work.videoUrl

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(26,35,50,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.26 }}
        style={{ width: '100%', maxWidth: 900, position: 'relative' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          style={{ position: 'absolute', top: -36, right: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <X size={14} /> Close (Esc)
        </button>
        <div style={{ aspectRatio: '16/9', background: '#000', borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(93,173,226,0.25)' }}>
          {work.videoFile ? (
            <video src={work.videoFile} controls autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} />
          ) : (
            <iframe src={`${src}?autoplay=1`} title={work.title}
              style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          )}
        </div>
        <div style={{ background: '#ffffff', borderRadius: '0 0 2px 2px', padding: '16px 20px' }}>
          <span className="section-label" style={{ fontSize: 9 }}>{work.category}</span>
          <h3 className="font-playfair" style={{ fontSize: 16, fontWeight: 600, color: '#1a2332', fontFamily: "'Playfair Display',serif", margin: '4px 0' }}>{work.title}</h3>
          <p style={{ fontSize: 12, color: '#6a8aaa' }}>{work.description}</p>
          {work.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {work.tags.map(t => <span key={t} className="tag-sm">{t}</span>)}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function WorkCard({ work, i, inView, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      className="card-white"
      style={{ cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s' }}>

      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#e8f0f8' }}>
        {work.videoFile ? (
          <VideoThumb src={work.videoFile} alt={work.title} hovered={hov} />
        ) : work.thumbnail ? (
          <img src={work.thumbnail} alt={work.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hov ? 'scale(1.06)' : 'scale(1)', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#e8f0f8,#d0e4f0)' }}>
            <span style={{ fontSize: 44, opacity: 0.3 }}>🎬</span>
          </div>
        )}

        {/* Play overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,35,50,0.6)', opacity: hov ? 1 : 0, transition: 'opacity 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid #5dade2', background: 'rgba(46,134,193,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: hov ? 'scale(1)' : 'scale(0.65)', transition: 'transform 0.22s' }}>
            <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
          </div>
        </div>

        {work.featured && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#2e86c1', color: '#fff', fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: "'Space Grotesk',sans-serif", borderRadius: 2 }}>Featured</div>
        )}
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.9)', color: '#2e86c1', fontSize: 8, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: "'Space Grotesk',sans-serif", borderRadius: 2 }}>{work.category}</div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px' }}>
        <h3 className="font-playfair" style={{ fontSize: 14, fontWeight: 600, color: hov ? '#2e86c1' : '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 6, transition: 'color 0.25s', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{work.title}</h3>
        <p className="line-clamp-2" style={{ fontSize: 12, color: '#7a9ab8', lineHeight: 1.6, marginBottom: 12 }}>{work.description}</p>
        {work.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {work.tags.slice(0, 3).map(t => <span key={t} className="tag-sm">{t}</span>)}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Works() {
  const [ref, inView] = useInView({ threshold: 0.04, triggerOnce: true })
  const [works, setWorks]       = useState(fallbackWorks)
  const [cat, setCat]           = useState('All')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    setLoading(true)
    getWorks(cat)
      .then(r => { if (r.data?.length) setWorks(r.data); else setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat)) })
      .catch(() => setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat)))
      .finally(() => setLoading(false))
  }, [cat])

  return (
    <>
      <section id="works" ref={ref} className="section-white" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>Portfolio</span>
            <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>My Works</h2>
            <p style={{ color: '#6a8aaa', fontSize: 14, maxWidth: 440, margin: '0 auto' }}>
              Each frame crafted with purpose — cinematic productions across multiple formats.
            </p>
            <div className="blue-divider" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 44 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  background: cat === c ? '#2e86c1' : '#ffffff',
                  color: cat === c ? '#ffffff' : '#5a7a9a',
                  border: cat === c ? 'none' : '1.5px solid #dce8f3',
                  padding: '7px 18px', cursor: 'pointer', borderRadius: 2, transition: 'all 0.25s',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontFamily: "'Space Grotesk',sans-serif",
                  boxShadow: cat === c ? '0 4px 14px rgba(46,134,193,0.3)' : 'none',
                }}>
                {c}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {loading
              ? <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                  <div style={{ width: 28, height: 28, border: '3px solid #2e86c1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
                </motion.div>
              : <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="works-grid">
                  {works.map((w, i) => <WorkCard key={w._id || i} work={w} i={i} inView={inView} onClick={() => setSelected(w)} />)}
                </motion.div>
            }
          </AnimatePresence>
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
