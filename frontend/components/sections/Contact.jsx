'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Mail, Phone, MapPin, Video, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitContact } from '@/lib/api'
import InstagramIcon from '@/components/ui/InstagramIcon'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })
  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 10)  e.message = 'Min 10 characters'
    return e
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true); setStatus(null)
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch { setStatus('error') }
    finally   { setLoading(false) }
  }

  return (
    <section id="contact" ref={ref} className="section-light" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -80, right: -80, width: 400, height: 400, background: 'rgba(46,134,193,0.06)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#2e86c1,transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>Let's Collaborate</span>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>Get In Touch</h2>
          <p style={{ color: '#6a8aaa', fontSize: 14, maxWidth: 400, margin: '0 auto' }}>Have a project in mind? Let's create something cinematic together.</p>
          <div className="blue-divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'start' }} className="contact-grid">

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <h3 className="font-playfair" style={{ fontSize: 26, fontWeight: 300, color: '#1a2332', fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>Let's work together</h3>
            <p style={{ fontSize: 14, color: '#6a8aaa', lineHeight: 1.8, marginBottom: 28 }}>
              Open to commercial productions, wedding films, content creation, drone shoots, and brand films.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                { icon: <Mail size={15} />,  label: 'EMAIL',   val: 'shriramaru214@gmail.com', href: 'mailto:shriramaru214@gmail.com' },
                { icon: <Phone size={15} />, label: 'PHONE',   val: '+91 78786 20380',          href: 'tel:+917878620380' },
                { icon: <MapPin size={15} />,label: 'BASED',   val: 'India',                    href: null },
              ].map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
                  className="card-white" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px' }}>
                  <div style={{ width: 38, height: 38, background: 'rgba(46,134,193,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2e86c1', flexShrink: 0, borderRadius: 2 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: '#2e86c1', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 2, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} style={{ fontSize: 13, color: '#3a5a7a', textDecoration: 'none', fontWeight: 500 }}>{c.val}</a>
                      : <span style={{ fontSize: 13, color: '#3a5a7a', fontWeight: 500 }}>{c.val}</span>
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div style={{ marginBottom: 28 }}>
              <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Follow My Work</span>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: <Video size={15} />, label: 'YouTube',   href: 'https://www.youtube.com/@shriramtoksiya' },
                  { icon: <InstagramIcon size={15} />, label: 'Instagram', href: 'https://www.instagram.com/shriramtoksiya?igsh=ZHl1aXpldHMycW9n&utm_souce=qr' },
                  { icon: <Mail size={15} />,  label: 'Email',     href: 'mailto:shriramaru214@gmail.com' },
                ].map(s => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.label}
                    className="card-white"
                    style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a7a9a', textDecoration: 'none', transition: 'color 0.25s, border-color 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#2e86c1'; e.currentTarget.style.borderColor = '#2e86c1' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5a7a9a'; e.currentTarget.style.borderColor = '#dce8f3' }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="card-white" style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', padding: 0 }}>
              <img src="https://images.unsplash.com/photo-1522776851755-3914469f0ca2?w=700&q=80"
                alt="Cinematography" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.85 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,35,50,0.7) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                <span className="section-label" style={{ fontSize: 8, color: '#7ec8e3', display: 'block', marginBottom: 3 }}>Available for</span>
                <div style={{ fontSize: 13, color: '#ffffff', fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>Freelance · Production · Collaboration</div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <form onSubmit={handleSubmit} noValidate className="card-white" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                <div>
                  <input type="text" name="name" placeholder="Your Name *" value={form.name} onChange={handleChange} className="input-light" />
                  {errors.name && <p style={{ color: '#e74c3c', fontSize: 11, marginTop: 4 }}>{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={handleChange} className="input-light" />
                  {errors.email && <p style={{ color: '#e74c3c', fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
                </div>
              </div>

              <input type="tel" name="phone" placeholder="Phone Number (optional)" value={form.phone} onChange={handleChange} className="input-light" />

              <div>
                <input type="text" name="subject" placeholder="Subject *" value={form.subject} onChange={handleChange} className="input-light" />
                {errors.subject && <p style={{ color: '#e74c3c', fontSize: 11, marginTop: 4 }}>{errors.subject}</p>}
              </div>

              <div>
                <textarea name="message" placeholder="Tell me about your project... *" value={form.message} onChange={handleChange} rows={6} className="input-light" style={{ resize: 'none' }} />
                {errors.message && <p style={{ color: '#e74c3c', fontSize: 11, marginTop: 4 }}>{errors.message}</p>}
              </div>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(39,174,96,0.08)', border: '1.5px solid rgba(39,174,96,0.3)', color: '#27ae60', fontSize: 13, borderRadius: 2 }}>
                  <CheckCircle2 size={15} /> Message sent! I'll reply within 24 hours. Check your email for confirmation.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(231,76,60,0.08)', border: '1.5px solid rgba(231,76,60,0.3)', color: '#e74c3c', fontSize: 13, borderRadius: 2 }}>
                  <AlertCircle size={15} /> Something went wrong. Please email directly at shriramaru214@gmail.com
                </motion.div>
              )}

              <button type="submit" disabled={loading} className="btn-blue"
                style={{ justifyContent: 'center', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer', transform: 'none' }}>
                {loading
                  ? <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                  : <><Send size={13} /> Send Message</>
                }
                <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: '#8aaac8', letterSpacing: '0.1em', fontFamily: "'Space Grotesk',sans-serif" }}>
                📨 You'll receive a confirmation email
              </p>
            </form>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr !important;}.form-row{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  )
}
