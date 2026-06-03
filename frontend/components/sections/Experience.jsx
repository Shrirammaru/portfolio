'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, Briefcase, Calendar } from 'lucide-react'
import { experiences } from '@/lib/data'

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="experience" ref={ref} className="section-light" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -80, right: -80, width: 400, height: 400, background: 'rgba(46,134,193,0.06)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>Career</span>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif" }}>Work Experience</h2>
          <div className="blue-divider" />
        </motion.div>

        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {experiences.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom, #2e86c1, transparent)', borderRadius: 2 }} />
              <div className="card-white" style={{ padding: '32px 36px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 48, height: 48, background: 'rgba(46,134,193,0.1)', border: '1px solid rgba(46,134,193,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, borderRadius: 2 }}>
                      {exp.logo}
                    </div>
                    <div>
                      <h3 className="font-playfair" style={{ fontSize: 17, fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif" }}>{exp.role}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <Briefcase size={11} color="#2e86c1" />
                        <span style={{ color: '#2e86c1', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>{exp.company}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#8aaac8', fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
                      <Calendar size={11} /> {exp.duration}
                    </div>
                    <div style={{ background: 'rgba(46,134,193,0.1)', border: '1px solid rgba(46,134,193,0.3)', color: '#2e86c1', fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px', fontFamily: "'Space Grotesk',sans-serif", borderRadius: 2 }}>
                      {exp.years}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#5a7a9a', lineHeight: 1.8, marginBottom: 24 }}>{exp.description}</p>
                <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Key Achievements</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }} className="achiev-grid">
                  {exp.highlights.map((h, j) => (
                    <motion.div key={j} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + j * 0.07 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <CheckCircle2 size={13} color="#2e86c1" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#5a7a9a', lineHeight: 1.6 }}>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 52 }} className="photos-grid">
          {[
            'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&q=80',
            'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=400&q=80',
            'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
          ].map((src, i) => (
            <div key={i} className="card-white" style={{ aspectRatio: '16/9', overflow: 'hidden', padding: 0 }}>
              <img src={src} alt={`Production ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'opacity 0.4s, transform 0.5s', display: 'block' }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { e.target.style.opacity = 0.7; e.target.style.transform = 'scale(1)' }} />
            </div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media(max-width:640px){.achiev-grid{grid-template-columns:1fr !important;}.photos-grid{grid-template-columns:repeat(2,1fr) !important;}}
      `}</style>
    </section>
  )
}
