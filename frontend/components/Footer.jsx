'use client'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Video, ArrowUp } from 'lucide-react'
import InstagramIcon from '@/components/ui/InstagramIcon'

export default function Footer() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const toTop    = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year     = new Date().getFullYear()

  return (
    <footer style={{ background: '#1a2332', borderTop: '3px solid #2e86c1', paddingTop: 64, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#1a5f8a,#2e86c1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, flexShrink: 0 }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>ST</span>
              </div>
              <span className="font-playfair" style={{ fontSize: 17, fontWeight: 600, color: '#ffffff', fontFamily: "'Playfair Display',serif" }}>Shriram Toksiya</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 20 }}>
              Cinematographer · Video Editor · Drone Pilot<br />
              Turning vision into cinematic reality.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: <Video size={15} />, href: 'https://www.youtube.com/@shriramtoksiya', label: 'YouTube' },
                { icon: <InstagramIcon size={15} />, href: 'https://www.instagram.com/shriramtoksiya?igsh=ZHl1aXpldHMycW9n&utm_souce=qr', label: 'Instagram' },
                { icon: <Mail size={15} />,  href: 'mailto:shriramaru214@gmail.com', label: 'Email' },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, transition: 'color 0.25s, border-color 0.25s, background 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#5dade2'; e.currentTarget.style.background = 'rgba(93,173,226,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'transparent' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: 18, color: '#7ec8e3' }}>Quick Links</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['home','about','skills','works','experience','testimonials','contact'].map(id => (
                <button key={id} onClick={() => scrollTo(id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'left', textTransform: 'capitalize', transition: 'color 0.2s', padding: 0, fontFamily: "'DM Sans',sans-serif" }}
                  onMouseEnter={e => e.target.style.color = '#5dade2'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                  {id}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: 18, color: '#7ec8e3' }}>Contact</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: <Mail size={13} />,  text: 'shriramaru214@gmail.com', href: 'mailto:shriramaru214@gmail.com' },
                { icon: <Phone size={13} />, text: '+91 78786 20380',          href: 'tel:+917878620380' },
                { icon: <MapPin size={13} />,text: 'India',                    href: null },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ color: '#5dade2', flexShrink: 0 }}>{c.icon}</span>
                  {c.href
                    ? <a href={c.href} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.color = '#5dade2'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>{c.text}</a>
                    : c.text
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontFamily: "'Space Grotesk',sans-serif" }}>
            © {year} Shriram Toksiya. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontFamily: "'Space Grotesk',sans-serif" }}>
              Built with Next.js · MongoDB
            </p>
            <button onClick={toTop}
              style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.35)', borderRadius: 2, transition: 'color 0.25s, border-color 0.25s, background 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#5dade2'; e.currentTarget.style.background = 'rgba(93,173,226,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent' }}
              aria-label="Back to top">
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr !important;gap:32px !important;}}
      `}</style>
    </footer>
  )
}
