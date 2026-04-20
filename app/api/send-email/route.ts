import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { to, subject, message, type } = await request.json()

    let html = ''

    if (type === 'new_message') {
      html = `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #2D5A3D; font-size: 24px; font-weight: 300; font-family: Georgia, serif;">🌿 Renew Store</h1>
          </div>
          <div style="background: #F5F0E8; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 500; margin-bottom: 8px; color: #1E1E1E;">You have a new message</h2>
            <p style="font-size: 14px; color: #7A7068; line-height: 1.7;">${message}</p>
          </div>
          <a href="https://renew-store.vercel.app/chat" style="display: block; text-align: center; background: #2D5A3D; color: white; padding: 14px 32px; text-decoration: none; border-radius: 2px; font-size: 13px; font-weight: 500; letter-spacing: 0.05em;">View Message</a>
          <p style="text-align: center; font-size: 11px; color: #7A7068; margin-top: 24px;">Renew Store · Qatar's Marketplace · <a href="https://renew-store.vercel.app/privacy" style="color: #2D5A3D;">Privacy Policy</a></p>
        </div>
      `
    }

    if (type === 'order_confirmed') {
      html = `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #2D5A3D; font-size: 24px; font-weight: 300; font-family: Georgia, serif;">🌿 Renew Store</h1>
          </div>
          <div style="background: #EBF2EC; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 500; margin-bottom: 8px; color: #2D5A3D;">✅ Payment confirmed!</h2>
            <p style="font-size: 14px; color: #4A4A4A; line-height: 1.7;">${message}</p>
          </div>
          <a href="https://renew-store.vercel.app/orders" style="display: block; text-align: center; background: #2D5A3D; color: white; padding: 14px 32px; text-decoration: none; border-radius: 2px; font-size: 13px; font-weight: 500; letter-spacing: 0.05em;">View Order</a>
          <p style="text-align: center; font-size: 11px; color: #7A7068; margin-top: 24px;">Renew Store · Qatar's Marketplace · <a href="https://renew-store.vercel.app/privacy" style="color: #2D5A3D;">Privacy Policy</a></p>
        </div>
      `
    }

    if (type === 'dispute_opened') {
      html = `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #2D5A3D; font-size: 24px; font-weight: 300; font-family: Georgia, serif;">🌿 Renew Store</h1>
          </div>
          <div style="background: #FEE2E2; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 500; margin-bottom: 8px; color: #DC2626;">⚠️ Dispute opened</h2>
            <p style="font-size: 14px; color: #4A4A4A; line-height: 1.7;">${message}</p>
          </div>
          <p style="font-size: 13px; color: #7A7068; text-align: center;">Our team will review your case and contact you within 24 hours.</p>
          <p style="text-align: center; font-size: 11px; color: #7A7068; margin-top: 24px;">Renew Store · Qatar's Marketplace · <a href="https://renew-store.vercel.app/privacy" style="color: #2D5A3D;">Privacy Policy</a></p>
        </div>
      `
    }

    const { data, error } = await resend.emails.send({
      from: 'Renew Store <noreply@renew-store.com>',
      to: [to],
      subject: subject,
      html: html,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}
