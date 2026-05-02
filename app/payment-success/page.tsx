'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    async function createOrder() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user?.email) return
console.log('Payment success params:', window.location.search)
      const params = new URLSearchParams(window.location.search)
      const productTitle = params.get('title') || 'Item'
      const productEmoji = params.get('emoji') || '📦'
      const sellerEmail = params.get('seller_email') || 'renewstoreqa@gmail.com'
      const amount = parseFloat(params.get('amount') || '0')
      const listingId = params.get('listing_id') || ''

      const { data, error } = await supabase.from('orders').insert({
        buyer_id: session.user.id,
        buyer_email: session.user.email,
        seller_email: sellerEmail,
        product_title: productTitle,
        product_emoji: productEmoji,
        amount: amount,
        status: 'confirmed'
      }).select().single()

      if (!error) {
        if (listingId) {
          await supabase.from('listings').update({ status: 'sold' }).eq('id', listingId)
        }

        // Create initial chat message
        await supabase.from('chat_messages').insert({
          order_id: data.id,
          sender_email: 'renewstoreqa@gmail.com',
          message: `Hi! Your order for "${productTitle}" has been confirmed. Please use this chat to arrange the pickup with the seller. 🌿`
        })

        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: session.user.email,
            subject: '✅ Payment confirmed — Renew Store',
            message: `Your payment of QAR ${amount} for "${productTitle}" has been confirmed! The seller will contact you via chat to arrange pickup.`,
            type: 'order_confirmed'
          })
        })

        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: sellerEmail,
            subject: '🛍️ You have a new order — Renew Store',
            message: `Great news! "${productTitle}" sold for QAR ${amount}. Please contact the buyer via chat to arrange pickup.`,
            type: 'order_confirmed'
          })
        })

        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'renewstoreqa@gmail.com',
            subject: '💰 New order — Renew Store',
            message: `New order #${data.id}: ${productTitle} · QAR ${amount} · Buyer: ${session.user.email} · Seller: ${sellerEmail}`,
            type: 'order_confirmed'
          })
        })
      }
    }

    createOrder()

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = '/orders'
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
          <p style={{fontSize:'13px', color:'#4A4A4A', lineHeight:'1.7'}}>A confirmation email has been sent to you. The seller has also been notified and will contact you shortly.</p>
        </div>
        <p style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'500', marginBottom:'16px'}}>
          Redirecting to orders in {countdown} seconds...
        </p>
        <button onClick={() => window.location.href='/orders'} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'14px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px'}}>
          📦 View my orders
        </button>
      </div>
    </main>
  )
}