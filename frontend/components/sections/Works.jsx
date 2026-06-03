'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X, Volume2, VolumeX } from 'lucide-react'
import { getWorks } from '@/lib/api'
import { fallbackWorks } from '@/lib/data'

const cats = ['All', 'Cinematography', 'Drone', 'Commercial', 'Short Film', 'Content Creator', 'Editing']

/* ── Video thumbnail — captures frame at 1s ── */
function VideoThumb({ src, alt, hovered }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={e => {
          e.target.currentTime = 1
          setReady(true)
        }}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transition: 'transform 0.6s',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      {/* loading shimmer */}
      {!ready && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #dce8f3, #e8f4fe)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 36, opacity: 0.2 }}>🎬</span>
        </div>
      )}
    </div>
  )
}

/* ── Full screen video modal ── */
function Modal({ work, onClose }) {
  const [muted, setMuted] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(13,20,32,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ width: '100%', maxWidth: 900, position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: -40, right: 0,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
        }}>
          <X size={15} /> Close (Esc)
        </button>

        {/* Video player */}
        <div style={{ aspectRatio: '16/9', background: '#000', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(46,134,193,0.3)' }}>
          {work.videoFile ? (
            <video
              ref={videoRef}
              src={work.videoFile}
              controls
              autoPlay
              playsInline
              preload="auto"
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', display: 'block' }}
            />
          ) : work.videoUrl ? (
            <iframe
              src={`${work.videoUrl}?autoplay=1`}
              title={work.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a7a9a', fontSize: 14 }}>
              No video available
            </div>
          )}
        </div>

        {/* Info bar */}
        <div style={{ background: '#fff', borderRadius: '0 0 4px 4px', padding: '14px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#2e86c1', fontFamily: "'Space Grotesk',sans-serif" }}>
              {work.category}
            </span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", margin: '3px 0 4px' }}>
              {work.title}
            </h3>
            <p style={{ fontSize: 12, color: '#6a8aaa', margin: 0 }}>{work.description}</p>
          </div>
          {work.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, flexShrink: 0 }}>
              {work.tags.map(t => (
                <span key={t} style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '2px 8px', borderRadius: 4, border: '1px solid #c5ddf0', color: '#5dade2',
                  background: 'rgba(46,134,193,0.06)', fontFamily: "'Space Grotesk',sans-serif",
                }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Work card ── */
function WorkCard({ work, i, inView, onClick }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: '#fff', border: `1.5px solid ${hov ? '#2e86c1' : '#dce8f3'}`,
        borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        boxShadow: hov ? '0 12px 36px rgba(46,134,193,0.15)' : '0 2px 8px rgba(26,35,50,0.06)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#e8f0f8' }}>
        {work.videoFile
          ? <VideoThumb src={work.videoFile} alt={work.title} hovered={hov} />
          : work.thumbnail
            ? <img src={work.thumbnail} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#dce8f3,#e8f4fe)' }}>
                <span style={{ fontSize: 44, opacity: 0.2 }}>🎬</span>
              </div>
        }

        {/* Hover play overlay */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(26,35,50,0.55)', opacity: hov ? 1 : 0, transition: 'opacity 0.25s',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            border: '2px solid #fff', background: 'rgba(46,134,193,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hov ? 'scale(1)' : 'scale(0.6)', transition: 'transform 0.22s',
          }}>
            <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
          </div>
        </div>

        {/* Badges */}
        {work.featured && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#2e86c1', color: '#fff', fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif" }}>
            Featured
          </div>
        )}
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.92)', color: '#2e86c1', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif" }}>
          {work.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <h3 style={{
          fontSize: 14, fontWeight: 700, color: hov ? '#2e86c1' : '#1a2332',
          fontFamily: "'Playfair Display',serif", marginBottom: 6, transition: 'color 0.25s',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
        }}>
          {work.title}
        </h3>
        <p style={{ fontSize: 12, color: '#7a9ab8', lineHeight: 1.6, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {work.description}
        </p>
        {work.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {work.tags.slice(0, 3).map(t => (
              <span key={t} style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, border: '1px solid #c5ddf0', color: '#5dade2', background: 'rgba(46,134,193,0.06)', fontFamily: "'Space Grotesk',sans-serif" }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Main section ── */
export default function Works() {
  const [ref, inView] = useInView({ threshold: 0.04, triggerOnce: true })
  const [works, setWorks]       = useState(fallbackWorks)
  const [cat, setCat]           = useState('All')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    setLoading(true)
    getWorks(cat)
      .then(r => {
        if (r.data?.length) setWorks(r.data)
        else setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat))
      })
      .catch(() => setWorks(fallbackWorks.filter(w => cat === 'All' || w.category === cat)))
      .finally(() => setLoading(false))
  }, [cat])

  return (
    <>
      <section id="works" ref={ref} style={{ padding: '96px 0', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'block', marginBottom: 10, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#2e86c1', fontFamily: "'Space Grotesk',sans-serif" }}>Portfolio</span>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>My Works</h2>
            <p style={{ color: '#6a8aaa', fontSize: 14, maxWidth: 440, margin: '0 auto' }}>
              Click any card to watch — cinematic productions across multiple formats.
            </p>
            <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,#2e86c1,transparent)', borderRadius: 1, margin: '12px auto 0' }} />
          </motion.div>

          {/* Filter tabs */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? '#2e86c1' : '#f0f4f8',
                color: cat === c ? '#fff' : '#5a7a9a',
                border: cat === c ? 'none' : '1.5px solid #dce8f3',
                padding: '7px 18px', cursor: 'pointer', borderRadius: 20, transition: 'all 0.25s',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: "'Space Grotesk',sans-serif",
                boxShadow: cat === c ? '0 4px 14px rgba(46,134,193,0.3)' : 'none',
              }}>
                {c}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div style={{ width: 28, height: 28, border: '3px solid #2e86c1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
              </motion.div>
            ) : (
              <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="works-grid">
                {works.map((w, i) => (
                  <WorkCard key={w._id || i} work={w} i={i} inView={inView} onClick={() => setSelected(w)} />
                ))}
              </motion.div>
            )}
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
