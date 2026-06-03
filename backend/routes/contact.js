const express    = require('express')
const router     = express.Router()
const nodemailer = require('nodemailer')

// ── Transporter ────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

// ── Notification email to Shriram ──────────────────────────────────────────
function buildNotifyHTML({ name, email, phone, subject, message }) {
  const date = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short',
  })
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dce8f3;max-width:600px;width:100%;border-radius:4px;overflow:hidden;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1a2332,#1a5f8a);padding:36px 40px;text-align:center;border-bottom:3px solid #2e86c1;">
    <div style="display:inline-block;width:48px;height:48px;background:#2e86c1;line-height:48px;text-align:center;font-size:18px;font-weight:800;color:#fff;border-radius:4px;margin-bottom:14px;">ST</div>
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.04em;">New Project Inquiry</h1>
    <p style="margin:0;font-size:11px;color:#7ec8e3;letter-spacing:0.25em;text-transform:uppercase;">Shriram Toksiya · Portfolio</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 24px;font-size:14px;color:#6a8aaa;line-height:1.7;">You received a new message through your portfolio contact form:</p>

    <!-- Name -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;border-radius:0 2px 2px 0;">
        <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">👤 From</p>
        <p style="margin:0;font-size:15px;color:#1a2332;font-weight:700;">${name}</p>
      </td></tr>
    </table>

    <!-- Email -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;border-radius:0 2px 2px 0;">
        <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">📧 Email</p>
        <a href="mailto:${email}" style="font-size:14px;color:#2e86c1;text-decoration:none;font-weight:500;">${email}</a>
      </td></tr>
    </table>

    ${phone ? `
    <!-- Phone -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;border-radius:0 2px 2px 0;">
        <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">📞 Phone</p>
        <a href="tel:${phone}" style="font-size:14px;color:#2e86c1;text-decoration:none;font-weight:500;">${phone}</a>
      </td></tr>
    </table>` : ''}

    <!-- Subject -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;border-radius:0 2px 2px 0;">
        <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">📋 Subject</p>
        <p style="margin:0;font-size:15px;color:#1a2332;font-weight:600;">${subject}</p>
      </td></tr>
    </table>

    <!-- Message -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:#1a2332;border-top:2px solid #2e86c1;padding:22px;border-radius:0 0 2px 2px;">
        <p style="margin:0 0 10px;font-size:9px;color:#5dade2;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">💬 Message</p>
        <p style="margin:0;font-size:14px;color:#c5ddf0;line-height:1.85;white-space:pre-wrap;">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
      </td></tr>
    </table>

    <!-- Reply CTA -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr><td align="center">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
          style="display:inline-block;background:linear-gradient(135deg,#1a5f8a,#2e86c1);color:#ffffff;text-decoration:none;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:14px 36px;border-radius:2px;">
          ↩ Reply to ${name}
        </a>
      </td></tr>
    </table>

    <p style="margin:0;font-size:11px;color:#c5ddf0;text-align:center;">${date} IST</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f0f4f8;border-top:1px solid #dce8f3;padding:18px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#8aaac8;">Shriram Toksiya · Cinematographer & Video Editor · shriramaru214@gmail.com</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

// ── Auto-reply to sender ────────────────────────────────────────────────────
function buildAutoReplyHTML({ name }) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dce8f3;max-width:600px;width:100%;border-radius:4px;overflow:hidden;">

  <tr><td style="background:linear-gradient(135deg,#1a2332,#1a5f8a);padding:36px 40px;text-align:center;border-bottom:3px solid #2e86c1;">
    <div style="display:inline-block;width:48px;height:48px;background:#2e86c1;line-height:48px;text-align:center;font-size:18px;font-weight:800;color:#fff;border-radius:4px;margin-bottom:14px;">ST</div>
    <h1 style="margin:0 0 6px;font-size:22px;color:#ffffff;font-weight:700;">Message Received!</h1>
    <p style="margin:0;font-size:11px;color:#7ec8e3;letter-spacing:0.25em;text-transform:uppercase;">Shriram Toksiya · Cinematographer</p>
  </td></tr>

  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 18px;font-size:16px;color:#1a2332;">Hi <strong style="color:#2e86c1;">${name}</strong>,</p>
    <p style="margin:0 0 14px;font-size:14px;color:#5a7a9a;line-height:1.8;">
      Thank you for reaching out! I've received your message and will get back to you within <strong style="color:#1a2332;">24–48 hours</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:14px;color:#5a7a9a;line-height:1.8;">
      Looking forward to discussing your project and creating something cinematic together. 🎬
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;border-left:3px solid #2e86c1;margin-bottom:28px;">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 5px;font-size:14px;color:#2e86c1;font-weight:700;">Shriram Toksiya</p>
        <p style="margin:0 0 3px;font-size:12px;color:#6a8aaa;">Senior Cinematographer & Video Editor</p>
        <p style="margin:0 0 3px;font-size:12px;color:#6a8aaa;">WTL (World Through Lens)</p>
        <p style="margin:0;font-size:12px;color:#6a8aaa;">📞 +91 78786 20380 &nbsp;|&nbsp; 📧 shriramaru214@gmail.com</p>
      </td></tr>
    </table>
    <p style="margin:0;font-size:11px;color:#aac4d8;text-align:center;">This is an automated reply — please do not reply to this email.</p>
  </td></tr>

  <tr><td style="background:#f0f4f8;border-top:1px solid #dce8f3;padding:16px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#8aaac8;">© ${new Date().getFullYear()} Shriram Toksiya · All rights reserved</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

// ── POST /api/contact ───────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' })
    }

    // Try save to MongoDB if connected
    try {
      const mongoose = require('mongoose')
      if (mongoose.connection.readyState === 1) {
        const Contact = require('../models/Contact')
        await new Contact({ name, email, phone, subject, message }).save()
        console.log('📁 Saved to MongoDB')
      }
    } catch (dbErr) {
      console.log('ℹ️  DB save skipped:', dbErr.message)
    }

    // Verify transporter
    await transporter.verify()

    // Send notification to Shriram
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to:      process.env.MAIL_TO || 'shriramaru214@gmail.com',
      subject: `📩 New Inquiry: ${subject} — from ${name}`,
      html:    buildNotifyHTML({ name, email, phone, subject, message }),
    })
    console.log('✉️  Notification sent to Shriram')

    // Send auto-reply to sender
    await transporter.sendMail({
      from:    `"Shriram Toksiya" <${process.env.MAIL_USER}>`,
      to:      email,
      subject: `Thanks for reaching out, ${name}! — Shriram Toksiya`,
      html:    buildAutoReplyHTML({ name }),
    })
    console.log('✉️  Auto-reply sent to', email)

    res.status(201).json({
      success: true,
      message: 'Message sent! You will receive a confirmation email shortly.',
    })

  } catch (error) {
    console.error('Contact route error:', error.message, error.code)

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please contact directly at shriramaru214@gmail.com',
      })
    }
    if (error.code === 'ECONNECTION' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return res.status(500).json({
        success: false,
        message: 'Email server unreachable. Please try again or contact directly at shriramaru214@gmail.com',
      })
    }

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please email directly at shriramaru214@gmail.com',
    })
  }
})

// ── GET /api/contact ────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const mongoose = require('mongoose')
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: [], message: 'MongoDB not connected' })
    }
    const Contact = require('../models/Contact')
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, data: contacts })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
