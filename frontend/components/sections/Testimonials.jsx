'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { getTestimonials } from '@/lib/api'
import { fallbackTestimonials } from '@/lib/data'

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const palette  = ['#2e86c1','#1a5f8a','#5dade2','#7ec8e3','#2980b9']
  const color    = palette[name.charCodeAt(0) % palette.length]
  return (
    <div style={{ width: 44, height: 44, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0, fontFamily: "'Space Grotesk',sans-serif" }}>
      {initials}
    </div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [list, setList] = useState(fallbackTestimonials)
  const [cur, setCur]   = useState(0)
  const [dir, setDir]   = useState(1)
  const timer           = useRef(null)

  useEffect(() => {
    getTestimonials().then(r => { if (r.data?.length) setList(r.data) }).catch(() => {})
  }, [])

  const start = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => { setDir(1); setCur(c => (c + 1) % list.length) }, 5500)
  }
  useEffect(() => { start(); return () => clearInterval(timer.current) }, [list.length])
  const go = (n) => { setDir(n > cur ? 1 : -1); setCur(n); start() }
  const t = list[cur]

  return (
    <section id="testimonials" ref={ref} className="section-white" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* large decorative " */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', fontSize: '18rem', lineHeight: 1, color: 'rgba(46,134,193,0.05)', fontFamily: 'Georgia,serif', pointerEvents: 'none', userSelect: 'none' }}>"</div>
      <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, background: 'rgba(46,134,193,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>Social Proof</span>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif" }}>What They Say</h2>
          <div className="blue-divider" />
        </motion.div>

        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="card-white"
              style={{ padding: '44px 52px', position: 'relative', overflow: 'hidden', minHeight: 240, borderTop: '3px solid #2e86c1' }}>
              <span style={{ position: 'absolute', top: 16, right: 28, fontSize: 80, color: 'rgba(46,134,193,0.1)', fontFamily: 'Georgia,serif', lineHeight: 1, userSelect: 'none' }}>"</span>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={cur} custom={dir}
                  initial={{ opacity: 0, x: dir * 44 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -44 }}
                  transition={{ duration: 0.36, ease: 'easeInOut' }}>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="#2e86c1" color="#2e86c1" />
                    ))}
                  </div>
                  <blockquote className="font-playfair"
                    style={{ fontSize: 'clamp(15px,2.2vw,19px)', color: '#2a3f5a', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'Playfair Display',serif", marginBottom: 28, fontWeight: 400 }}>
                    "{t.message}"
                  </blockquote>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Avatar name={t.name} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', fontFamily: "'Space Grotesk',sans-serif" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: '#2e86c1', marginTop: 2, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '0.05em' }}>
                        {t.role}{t.company ? ` · ${t.company}` : ''}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <button onClick={() => go((cur - 1 + list.length) % list.length)}
                className="card-white" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1.5px solid #dce8f3', background: '#fff', color: '#5a7a9a', transition: 'color 0.25s, border-color 0.25s', borderRadius: 2, padding: 0 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#2e86c1'; e.currentTarget.style.borderColor = '#2e86c1' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#5a7a9a'; e.currentTarget.style.borderColor = '#dce8f3' }}>
                <ChevronLeft size={16} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {list.map((_, i) => (
                  <button key={i} onClick={() => go(i)}
                    style={{ borderRadius: 8, height: 6, transition: 'all 0.3s', background: i === cur ? '#2e86c1' : '#c5ddf0', width: i === cur ? 22 : 6, border: 'none', cursor: 'pointer' }} />
                ))}
              </div>
              <button onClick={() => go((cur + 1) % list.length)}
                className="card-white" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1.5px solid #dce8f3', background: '#fff', color: '#5a7a9a', transition: 'color 0.25s, border-color 0.25s', borderRadius: 2, padding: 0 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#2e86c1'; e.currentTarget.style.borderColor = '#2e86c1' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#5a7a9a'; e.currentTarget.style.borderColor = '#dce8f3' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28 }}>
            {list.map((item, i) => (
              <button key={i} onClick={() => go(i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%', opacity: i === cur ? 1 : 0.35, transform: i === cur ? 'scale(1.1)' : 'scale(1)', outline: i === cur ? '2px solid #2e86c1' : 'none', outlineOffset: 2, transition: 'all 0.3s' }}>
                <Avatar name={item.name} />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
