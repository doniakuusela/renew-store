'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Send confirmation emails
    async function sendEmails() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email) {
        // Email to buyer
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: session.user.email,
            subject: '✅ Payment confirmed — Renew Store',
            message: 'Your payment has been confirmed! The seller will contact you shortly via chat to arrange pickup. You have 24 hours after receiving the item to report any issues.',
            type: 'order_confirmed'
          })
        })

        // Email to store admin
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'renewstoreqa@gmail.com',
            subject: '🛍️ New order received — Renew Store',
            message: `New order from ${session.user.email}. Please check admin panel.`,
            type: 'order_confirmed'
          })
        })
      }
    }
    sendEmails()

    // Countdown to chat
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = '/chat'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{background:'white', padding:'48px', borderRadius:'4px', textAlign:'center', maxWidth:'480px', width:'100%', boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        
        <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
        
        <h1 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', marginBottom:'12px', color:'#1E1E1E'}}>Payment successful!</h1>
        
        <div style={{background:'#EBF2EC', padding:'16px', borderRadius:'4px', marginBottom:'24px'}}>
          <p style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'500', marginBottom:'4px'}}>✅ Your order is confirmed</p>
          <p style={{fontSize:'13px', color:'#4A4A4A', lineHeight:'1.7'}}>A confirmation email has been sent to you. The seller will contact you via chat to arrange pickup.</p>
        </div>

        <div style={{background:'#F5F0E8', padding:'16px', borderRadius:'4px', marginBottom:'24px'}}>
          <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'4px'}}>⏱️ 24h buyer protection</p>
          <p style={{fontSize:'12px', color:'#7A7068', lineHeight:'1.6'}}>After receiving the item, you have 24 hours to report any issues. If no dispute is raised, payment is released to the seller.</p>
        </div>

        <p style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'500', marginBottom:'16px'}}>
          Opening chat in {countdown} seconds...
        </p>

        <button onClick={() => window.location.href='/chat'} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'14px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px', marginBottom:'10px'}}>
          💬 Open chat now
        </button>

        <button onClick={() => window.location.href='/orders'} style={{width:'100%', background:'none', border:'1.5px solid #D9CEBC', color:'#7A7068', padding:'14px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>
          📦 View my orders
        </button>

      </div>
    </main>
  )
}