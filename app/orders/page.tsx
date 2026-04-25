'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function getStatusColor(status: string) {
  switch(status) {
    case 'confirmed': return { bg: '#EBF2EC', color: '#2D5A3D', text: '✅ Payment confirmed' }
    case 'completed': return { bg: '#F5F0E8', color: '#7A7068', text: '☑️ Completed' }
    case 'disputed': return { bg: '#FEE2E2', color: '#DC2626', text: '⚠️ Disputed' }
    default: return { bg: '#F5F0E8', color: '#7A7068', text: status }
  }
}

function TimeLeft({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    function update() {
      const diff = new Date(deadline).getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft('Expired')
        return
      }
      const hours = Math.floor(diff / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      setTimeLeft(`${hours}h ${mins}m remaining`)
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [deadline])
  return <span style={{fontSize:'12px', color:'#DC2626', fontWeight:'500'}}>{timeLeft}</span>
}

function ReviewForm({ order, onSubmit }: any) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    setSubmitting(true)
    await onSubmit(order.id, rating, comment)
    setSubmitting(false)
  }

  return (
    <div style={{background:'#F5F0E8', padding:'16px', borderRadius:'4px', marginTop:'12px'}}>
      <p style={{fontSize:'13px', fontWeight:'500', marginBottom:'10px'}}>Rate your experience with {order.seller_email?.split('@')[0]}:</p>
      <div style={{display:'flex', gap:'6px', marginBottom:'12px'}}>
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={() => setRating(n)} style={{background:'none', border:'none', cursor:'pointer', fontSize:'26px', padding:0}}>
            {n <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>
      <textarea 
        value={comment} 
        onChange={e => setComment(e.target.value)}
        placeholder="Optional comment about the seller or item..."
        style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'10px', fontSize:'13px', outline:'none', boxSizing:'border-box', borderRadius:'2px', minHeight:'60px', resize:'vertical', fontFamily:'sans-serif', marginBottom:'10px'}}
      />
      <button onClick={handleSubmit} disabled={submitting} style={{background:'#2D5A3D', color:'white', border:'none', padding:'10px 20px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px'}}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  )
}

export default function Orders() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [confirming, setConfirming] = useState<string | null>(null)
  const [showReview, setShowReview] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth'
        return
      }
      setUser(session.user)
      await loadOrders(session.user.id)
      setLoading(false)
    })
  }, [])

  async function loadOrders(userId: string) {
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('buyer_id', userId)
      .order('created_at', { ascending: false })
    if (ordersData) setOrders(ordersData)

    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('buyer_id', userId)
    if (reviewsData) setReviews(reviewsData)
  }

   async function confirmReceived(orderId: string) {
    setConfirming(orderId)
    const order = orders.find(o => o.id === orderId)
    
    await supabase.from('orders').update({ 
      status: 'completed',
      received_at: new Date().toISOString()
    }).eq('id', orderId)

    // Notify admin
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'renewstoreqa@gmail.com',
        subject: '📦 Buyer confirmed receipt — Renew Store',
        message: `The buyer has confirmed receipt of "${order?.product_title}". The 24-hour protection window has started. Check the admin panel to track when you can release payment to the seller.`,
        type: 'order_confirmed'
      })
    })

    await loadOrders(user.id)
    setConfirming(null)
    setShowReview(orderId)
  }

  async function openDispute(orderId: string) {
    await supabase.from('orders').update({ status: 'disputed' }).eq('id', orderId)
    await loadOrders(user.id)
  }

  async function submitReview(orderId: string, rating: number, comment: string) {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    await supabase.from('reviews').insert({
      order_id: orderId,
      buyer_id: user.id,
      seller_email: order.seller_email,
      rating: rating,
      comment: comment
    })

    await loadOrders(user.id)
    setShowReview(null)
  }

  function hasReviewed(orderId: string) {
    return reviews.some(r => r.order_id === orderId)
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back to listings</a>
      </nav>

      <div style={{maxWidth:'760px', margin:'0 auto', padding:'48px 8%'}}>
        <h1 style={{fontFamily:'Georgia, serif', fontSize:'36px', fontWeight:'300', marginBottom:'8px'}}>My Orders</h1>
        <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'32px'}}>Confirm receipt within 24h to release payment to seller</p>

        {orders.length === 0 ? (
          <div style={{background:'white', padding:'60px 20px', borderRadius:'4px', textAlign:'center'}}>
            <div style={{fontSize:'48px', marginBottom:'12px'}}>📦</div>
            <h3 style={{fontFamily:'Georgia, serif', fontSize:'22px', fontWeight:'300', marginBottom:'8px'}}>No orders yet</h3>
            <p style={{fontSize:'14px', color:'#7A7068', marginBottom:'20px'}}>Start browsing to find your first item</p>
            <button onClick={() => window.location.href='/'} style={{background:'#2D5A3D', color:'white', border:'none', padding:'12px 24px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>Browse items</button>
          </div>
        ) : (
          orders.map(order => {
            const statusStyle = getStatusColor(order.status)
            const deadline = new Date(new Date(order.created_at).getTime() + 86400000).toISOString()
            const reviewed = hasReviewed(order.id)
            return (
              <div key={order.id} style={{background:'white', borderRadius:'4px', padding:'24px', marginBottom:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px', flexWrap:'wrap'}}>
                  <div style={{width:'56px', height:'56px', background:'#EDE6D6', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0}}>
                    {order.product_emoji || '📦'}
                  </div>
                  <div style={{flex:1, minWidth:'160px'}}>
                    <div style={{fontSize:'16px', fontWeight:'500', marginBottom:'3px'}}>{order.product_title}</div>
                    <div style={{fontSize:'12px', color:'#7A7068'}}>Seller: {order.seller_email?.split('@')[0]}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'20px', fontWeight:'600', color:'#2D5A3D'}}>QAR {order.amount}</div>
                    <div style={{fontSize:'11px', color:'#7A7068', marginTop:'2px'}}>{new Date(order.created_at).toLocaleDateString()}</div>
                  </div>
                </div>

                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:statusStyle.bg, borderRadius:'4px', marginBottom:'16px', flexWrap:'wrap', gap:'8px'}}>
                  <span style={{fontSize:'13px', fontWeight:'500', color:statusStyle.color}}>{statusStyle.text}</span>
                  {order.status === 'confirmed' && <TimeLeft deadline={deadline}/>}
                </div>

                {order.status === 'confirmed' && (
                  <div>
                    <p style={{fontSize:'12px', color:'#7A7068', marginBottom:'12px', lineHeight:'1.6'}}>
                      Once you receive the item, confirm below. If there is an issue, open a dispute within 24h.
                    </p>
                    <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                      <button
                        onClick={() => confirmReceived(order.id)}
                        disabled={confirming === order.id}
                        style={{flex:1, minWidth:'160px', background:'#2D5A3D', color:'white', border:'none', padding:'12px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px'}}>
                        {confirming === order.id ? 'Confirming...' : '✅ I received the item'}
                      </button>
                      <button
                        onClick={() => openDispute(order.id)}
                        style={{padding:'12px 16px', border:'1.5px solid #DC2626', background:'white', color:'#DC2626', borderRadius:'2px', cursor:'pointer', fontSize:'13px', fontWeight:'500'}}>
                        ⚠️ Open dispute
                      </button>
                      <button
                        onClick={() => window.location.href='/chat'}
                        style={{padding:'12px 16px', border:'1.5px solid #D9CEBC', background:'white', color:'#7A7068', borderRadius:'2px', cursor:'pointer', fontSize:'13px'}}>
                        💬 Chat
                      </button>
                    </div>
                  </div>
                )}

                {order.status === 'completed' && (
                  <div>
                    {!reviewed && showReview !== order.id && (
                      <button onClick={() => setShowReview(order.id)} style={{background:'#2D5A3D', color:'white', border:'none', padding:'10px 18px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px'}}>
                        ⭐ Leave a review
                      </button>
                    )}
                    {showReview === order.id && (
                      <ReviewForm order={order} onSubmit={submitReview}/>
                    )}
                    {reviewed && (
                      <p style={{fontSize:'12px', color:'#2D5A3D', fontWeight:'500'}}>✅ You reviewed this seller</p>
                    )}
                  </div>
                )}

                {order.status === 'disputed' && (
                  <div style={{background:'#FEE2E2', padding:'12px', borderRadius:'4px'}}>
                    <p style={{fontSize:'13px', color:'#DC2626', fontWeight:'500', marginBottom:'4px'}}>⚠️ Dispute opened</p>
                    <p style={{fontSize:'12px', color:'#7A7068'}}>Our team will review your case and contact you within 24 hours. Please email us at <a href="mailto:renewstoreqa@gmail.com" style={{color:'#DC2626'}}>renewstoreqa@gmail.com</a></p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}