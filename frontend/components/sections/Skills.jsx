'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '@/lib/data'

const icons = {
  '🎨': { bg: '#fff3ed', border: '#ffb385', glow: 'rgba(255,120,50,0.15)' },
  '✂️': { bg: '#f3eeff', border: '#b085ff', glow: 'rgba(140,80,255,0.15)' },
  '🎥': { bg: '#e8f4fe', border: '#5dade2', glow: 'rgba(46,134,193,0.15)' },
  '🖼️': { bg: '#fff0f0', border: '#ff8585', glow: 'rgba(220,50,50,0.15)' },
  '💡': { bg: '#fffbe8', border: '#ffd060', glow: 'rgba(255,190,0,0.15)' },
  '🚁': { bg: '#e8faf5', border: '#52c7a8', glow: 'rgba(20,180,130,0.15)' },
  '🎧': { bg: '#e8f2ff', border: '#6aaff5', glow: 'rgba(40,120,255,0.15)' },
  '✨': { bg: '#fff7ed', border: '#fca85f', glow: 'rgba(240,130,30,0.15)' },
}

function SkillCard({ skill, i, inView, isActive, onClick }) {
  const palette = icons[skill.icon] || { bg: '#e8f4fe', border: '#5dade2', glow: 'rgba(46,134,193,0.15)' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      onClick={onClick}
      style={{
        background: isActive ? '#1a2332' : '#ffffff',
        border: isActive ? `1.5px solid ${palette.border}` : '1.5px solid #e8f0f8',
        borderRadius: 12,
        padding: '24px 20px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: isActive ? `0 8px 32px ${palette.glow}, 0 2px 8px rgba(0,0,0,0.1)` : '0 2px 8px rgba(26,35,50,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: `0 12px 36px ${palette.glow}` }}
    >
      {/* Active glow bg */}
      {isActive && (
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, ${palette.glow} 0%, transparent 65%)`, pointerEvents: 'none' }} />
      )}

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 10,
        background: isActive ? palette.bg : palette.bg,
        border: `1.5px solid ${palette.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, marginBottom: 14,
        boxShadow: `0 4px 12px ${palette.glow}`,
      }}>
        {skill.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginBottom: 6,
        color: isActive ? '#ffffff' : '#1a2332',
        fontFamily: "'Space Grotesk',sans-serif",
      }}>
        {skill.title}
      </h3>

      {/* Tool badge */}
      <span style={{
        display: 'inline-block', fontSize: 9, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: isActive ? palette.border : '#2e86c1',
        background: isActive ? `${palette.bg}22` : 'rgba(46,134,193,0.08)',
        border: `1px solid ${isActive ? palette.border + '55' : 'rgba(46,134,193,0.2)'}`,
        padding: '2px 8px', borderRadius: 4, marginBottom: 12,
        fontFamily: "'Space Grotesk',sans-serif",
      }}>
        {skill.tool}
      </span>

      {/* Description — shown on active */}
      <p style={{
        fontSize: 12, color: isActive ? 'rgba(255,255,255,0.65)' : '#7a9ab8',
        lineHeight: 1.65, marginBottom: 0,
      }}>
        {skill.description}
      </p>

      {/* Active indicator dot */}
      {isActive && (
        <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: palette.border, boxShadow: `0 0 8px ${palette.border}` }} />
      )}
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.04, triggerOnce: true })
  const [activeIdx, setActiveIdx] = useState(0)

  const active = skills[activeIdx]
  const palette = icons[active.icon] || { bg: '#e8f4fe', border: '#5dade2', glow: 'rgba(46,134,193,0.15)' }

  return (
    <section id="skills" ref={ref} className="section-light" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* bg blobs */}
      <div style={{ position: 'absolute', top: '30%', left: -100, width: 380, height: 380, background: 'rgba(46,134,193,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: -80, width: 300, height: 300, background: 'rgba(93,173,226,0.06)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>Craft & Expertise</span>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>
            My Skills
          </h2>
          <p style={{ color: '#6a8aaa', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>
            Click any skill to learn more — a complete cinematographer's toolkit built over 5+ years.
          </p>
          <div className="blue-divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }} className="skills-layout">

          {/* Left — cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="skills-grid">
            {skills.map((skill, i) => (
              <SkillCard
                key={skill.title}
                skill={skill}
                i={i}
                inView={inView}
                isActive={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* Right — detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ position: 'sticky', top: 100 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#1a2332',
                  border: `2px solid ${palette.border}`,
                  borderRadius: 16,
                  padding: 32,
                  boxShadow: `0 20px 60px ${palette.glow}, 0 4px 16px rgba(0,0,0,0.15)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glow bg */}
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, ${palette.glow} 0%, transparent 60%)`, pointerEvents: 'none' }} />

                {/* Icon large */}
                <div style={{
                  width: 70, height: 70, borderRadius: 14,
                  background: palette.bg,
                  border: `2px solid ${palette.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, marginBottom: 20,
                  boxShadow: `0 8px 24px ${palette.glow}`,
                }}>
                  {active.icon}
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#ffffff', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 6, lineHeight: 1.3 }}>
                  {active.title}
                </h3>

                <span style={{
                  display: 'inline-block', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: palette.border, background: `${palette.bg}18`,
                  border: `1px solid ${palette.border}55`,
                  padding: '3px 10px', borderRadius: 4, marginBottom: 18,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}>
                  {active.tool}
                </span>

                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, marginBottom: 20 }}>
                  {active.description}
                </p>

                <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: palette.border, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif" }}>
                    Why it matters
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {active.why}
                  </p>
                </div>

                {/* Skill number indicator */}
                <div style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>
                  {String(activeIdx + 1).padStart(2,'0')} / {String(skills.length).padStart(2,'0')}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
              {skills.map((_, i) => (
                <button key={i} onClick={() => setActiveIdx(i)}
                  style={{
                    width: i === activeIdx ? 20 : 6, height: 6,
                    borderRadius: 3, border: 'none', cursor: 'pointer',
                    background: i === activeIdx ? '#2e86c1' : '#c5ddf0',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools strip */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }}
          style={{ marginTop: 48, background: '#ffffff', border: '1.5px solid #dce8f3', borderRadius: 12, padding: '28px 32px', textAlign: 'center', boxShadow: '0 4px 20px rgba(26,35,50,0.06)' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 18 }}>Tools & Software</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {[
              { name: 'DaVinci Resolve', e: '🎨', color: '#ff7043' },
              { name: 'Premiere Pro',    e: '✂️', color: '#9c6ade' },
              { name: 'After Effects',   e: '✨', color: '#f0903a' },
              { name: 'Adobe Audition',  e: '🎧', color: '#4a90d9' },
              { name: 'Lightroom',       e: '📷', color: '#31a8ff' },
              { name: 'DJI Drones',      e: '🚁', color: '#1abc9c' },
            ].map(t => (
              <div key={t.name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 18px', borderRadius: 20,
                background: '#f0f4f8', border: '1.5px solid #dce8f3',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8f4fe'; e.currentTarget.style.borderColor = t.color + '60' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f0f4f8'; e.currentTarget.style.borderColor = '#dce8f3' }}>
                <span style={{ fontSize: 18 }}>{t.e}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3a5a7a', fontFamily: "'Space Grotesk',sans-serif" }}>{t.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:1100px){
          .skills-layout{grid-template-columns:1fr !important;}
          .skills-grid{grid-template-columns:repeat(4,1fr) !important;}
        }
        @media(max-width:800px){.skills-grid{grid-template-columns:repeat(2,1fr) !important;}}
        @media(max-width:500px){.skills-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  )
}
