'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Camera, Aperture, Film, Award } from 'lucide-react'

const highlights = [
  { icon: <Camera size={18} />,  title: 'Cinematic Vision',  desc: 'Every frame composed with light, depth & emotion.' },
  { icon: <Aperture size={18} />,title: 'Camera Mastery',    desc: 'Sony, RED, BMPCC — anamorphic to telephoto.' },
  { icon: <Film size={18} />,    title: 'Post Production',   desc: 'DaVinci Resolve color grade + Premiere Pro edit.' },
  { icon: <Award size={18} />,   title: '5 Years at WTL',    desc: 'Senior editor & drone pilot, World Through Lens.' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" ref={ref} className="section-white" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* bg blob */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'rgba(46,134,193,0.06)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>The Artist</span>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif" }}>Who I Am</h2>
          <div className="blue-divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="about-grid">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 2 }}>
              <img src="https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=700&q=85" alt="Shriram Toksiya"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {/* subtle blue overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,35,50,0.5) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', top: 12, left: 12, right: 12, bottom: 12, border: '1px solid rgba(46,134,193,0.3)', pointerEvents: 'none', borderRadius: 1 }} />
            </div>
            {/* stat card */}
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.65 }}
              className="glass-blue"
              style={{ position: 'absolute', bottom: -20, right: -16, padding: '20px 24px', minWidth: 148, borderRadius: 2 }}>
              <div className="accent-text font-playfair" style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>5+</div>
              <div style={{ fontSize: 11, color: '#2e86c1', marginTop: 4, lineHeight: 1.4, fontWeight: 500 }}>Years of Professional Filmmaking</div>
            </motion.div>
            {/* accent image */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
              style={{ position: 'absolute', top: -16, right: -16, width: 120, height: 120, overflow: 'hidden', border: '2px solid rgba(46,134,193,0.35)', borderRadius: 2 }}>
              <img src="https://images.unsplash.com/photo-1495851795-84c252dce69c?w=300&q=80" alt="Camera gear" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <h3 className="font-playfair" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 300, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 6 }}>Shriram Toksiya</h3>
            <span className="section-label" style={{ display: 'block', marginBottom: 24 }}>Senior Cinematographer & Video Editor</span>

            <p style={{ color: '#4a6a8a', lineHeight: 1.8, marginBottom: 16, fontSize: 14 }}>
              I believe every story deserves to be told beautifully. With 5+ years behind the lens — from intimate wedding films to high-stakes commercial productions — I bring a cinematic eye and technical precision to every frame.
            </p>
            <p style={{ color: '#4a6a8a', lineHeight: 1.8, marginBottom: 32, fontSize: 14 }}>
              As Senior Video Editor and Drone Pilot at{' '}
              <span style={{ color: '#2e86c1', fontWeight: 600 }}>WTL (World Through Lens)</span>,
              I've led productions end-to-end: storyboard → shoot → DaVinci color grade → final delivery.
            </p>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: 32 }}>
              {[
                { l: 'Name', v: 'Shriram Toksiya' },
                { l: 'Role', v: 'Cinematographer & Editor' },
                { l: 'Company', v: 'WTL Productions' },
                { l: 'Status', v: '✅ Available for Work' },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: '2px solid #2e86c1', paddingLeft: 12 }}>
                  <div style={{ fontSize: 9, color: '#2e86c1', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 3, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>{item.l}</div>
                  <div style={{ fontSize: 13, color: '#1a2332', fontWeight: 500 }}>{item.v}</div>
                </div>
              ))}
            </div>

            {/* Highlight cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {highlights.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.09 }}
                  className="card-white" style={{ padding: 16 }}>
                  <div style={{ color: '#2e86c1', marginBottom: 8 }}>{h.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2332', marginBottom: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{h.title}</div>
                  <div style={{ fontSize: 11, color: '#7a9ab8', lineHeight: 1.55 }}>{h.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:48px !important;}}`}</style>
    </section>
  )
}
