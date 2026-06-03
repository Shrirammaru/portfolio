import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

// ── Transporter ─────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
}

// ── Notification HTML to Shriram ────────────────────────────────────────────
function buildNotifyHTML({ name, email, phone, subject, message }) {
  const date = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short',
  })
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dce8f3;max-width:600px;width:100%;border-radius:4px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#1a2332,#1a5f8a);padding:36px 40px;text-align:center;border-bottom:3px solid #2e86c1;">
    <div style="display:inline-block;width:48px;height:48px;background:#2e86c1;line-height:48px;text-align:center;font-size:18px;font-weight:800;color:#fff;border-radius:4px;margin-bottom:14px;">ST</div>
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;">New Project Inquiry</h1>
    <p style="margin:0;font-size:11px;color:#7ec8e3;letter-spacing:0.25em;text-transform:uppercase;">Shriram Toksiya · Portfolio</p>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 24px;font-size:14px;color:#6a8aaa;line-height:1.7;">You received a new message through your portfolio:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;"><tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;">
      <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">👤 From</p>
      <p style="margin:0;font-size:15px;color:#1a2332;font-weight:700;">${name}</p>
    </td></tr></table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;"><tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;">
      <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">📧 Email</p>
      <a href="mailto:${email}" style="font-size:14px;color:#2e86c1;text-decoration:none;">${email}</a>
    </td></tr></table>
    ${phone ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;"><tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;">
      <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">📞 Phone</p>
      <a href="tel:${phone}" style="font-size:14px;color:#2e86c1;text-decoration:none;">${phone}</a>
    </td></tr></table>` : ''}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;"><tr><td style="background:#f0f4f8;border-left:3px solid #2e86c1;padding:14px 18px;">
      <p style="margin:0 0 3px;font-size:9px;color:#2e86c1;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">📋 Subject</p>
      <p style="margin:0;font-size:15px;color:#1a2332;font-weight:600;">${subject}</p>
    </td></tr></table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr><td style="background:#1a2332;border-top:2px solid #2e86c1;padding:22px;">
      <p style="margin:0 0 10px;font-size:9px;color:#5dade2;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">💬 Message</p>
      <p style="margin:0;font-size:14px;color:#c5ddf0;line-height:1.85;white-space:pre-wrap;">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
    </td></tr></table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td align="center">
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block;background:linear-gradient(135deg,#1a5f8a,#2e86c1);color:#fff;text-decoration:none;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:14px 36px;border-radius:2px;">↩ Reply to ${name}</a>
    </td></tr></table>
    <p style="margin:0;font-size:11px;color:#aac4d8;text-align:center;">${date} IST</p>
  </td></tr>
  <tr><td style="background:#f0f4f8;border-top:1px solid #dce8f3;padding:16px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#8aaac8;">Shriram Toksiya · Cinematographer · shriramaru214@gmail.com</p>
  </td></tr>
</table></td></tr></table></body></html>`
}

// ── Auto reply to sender ─────────────────────────────────────────────────────
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
    <p style="margin:0 0 14px;font-size:14px;color:#5a7a9a;line-height:1.8;">Thank you for reaching out! I've received your message and will get back to you within <strong style="color:#1a2332;">24–48 hours</strong>.</p>
    <p style="margin:0 0 28px;font-size:14px;color:#5a7a9a;line-height:1.8;">Looking forward to discussing your project and creating something cinematic together. 🎬</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;border-left:3px solid #2e86c1;margin-bottom:28px;"><tr><td style="padding:18px 22px;">
      <p style="margin:0 0 5px;font-size:14px;color:#2e86c1;font-weight:700;">Shriram Toksiya</p>
      <p style="margin:0 0 3px;font-size:12px;color:#6a8aaa;">Senior Cinematographer & Video Editor</p>
      <p style="margin:0 0 3px;font-size:12px;color:#6a8aaa;">WTL (World Through Lens)</p>
      <p style="margin:0;font-size:12px;color:#6a8aaa;">📞 +91 78786 20380 &nbsp;|&nbsp; 📧 shriramaru214@gmail.com</p>
    </td></tr></table>
    <p style="margin:0;font-size:11px;color:#aac4d8;text-align:center;">This is an automated reply — please do not reply to this email.</p>
  </td></tr>
  <tr><td style="background:#f0f4f8;border-top:1px solid #dce8f3;padding:16px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#8aaac8;">© ${new Date().getFullYear()} Shriram Toksiya · All rights reserved</p>
  </td></tr>
</table></td></tr></table></body></html>`
}

// ── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      )
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const transporter = createTransporter()

    // Verify SMTP
    await transporter.verify()

    // Send notification to Shriram
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to:      process.env.MAIL_TO || 'shriramaru214@gmail.com',
      subject: `📩 New Inquiry: ${subject} — from ${name}`,
      html:    buildNotifyHTML({ name, email, phone, subject, message }),
    })

    // Send auto-reply to sender
    await transporter.sendMail({
      from:    `"Shriram Toksiya" <${process.env.MAIL_USER}>`,
      to:      email,
      subject: `Thanks for reaching out, ${name}! — Shriram Toksiya`,
      html:    buildAutoReplyHTML({ name }),
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent! You will receive a confirmation email shortly.',
    }, { status: 201 })

  } catch (error) {
    console.error('Contact API error:', error.message, error.code)

    if (error.code === 'EAUTH') {
      return NextResponse.json(
        { success: false, message: 'Email authentication failed. Contact directly at shriramaru214@gmail.com' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please email shriramaru214@gmail.com directly.' },
      { status: 500 }
    )
  }
}
