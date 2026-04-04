'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const demoOrders = [
  {
    id: '1',
    title: 'Zara Structured Tote Bag',
    emoji: '👜',
    seller: 'Layla Q.',
    amount: 95,
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    deadline: new Date(Date.now() + 82800000).toISOString(),
  },
  {
    id: '2',
    title: 'Massimo Dutti Silk Blouse',
    emoji: '👗',
    seller: 'Sara A.',
    amount: 120,
    status: 'completed',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    deadline: new Date(Date.now() - 86400000).toISOString(),
  }
]

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

export default function Orders() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState<string | null>(null)
  const [orders, setOrders] = useState(demoOrders)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth'
        return
      }
      setUser(session.user)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) window.location.href = '/auth'
      else { setUser(session.user); setLoading(false) }
    })
  }, [])

  function confirmReceived(orderId: string) {
    setConfirming(orderId)
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: 'completed'} : o))
      setConfirming(null)
    }, 1500)
  }

  function openDispute(orderId: string) {
    setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: 'disputed'} : o))
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

        {orders.map(order => {
          const statusStyle = getStatusColor(order.status)
          return (
            <div key={order.id} style={{background:'white', borderRadius:'4px', padding:'24px', marginBottom:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px'}}>
                <div style={{width:'56px', height:'56px', background:'#EDE6D6', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0}}>
                  {order.emoji}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'16px', fontWeight:'500', marginBottom:'3px'}}>{order.title}</div>
                  <div style={{fontSize:'12px', color:'#7A7068'}}>Seller: {order.seller}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:'20px', fontWeight:'600', color:'#2D5A3D'}}>QAR {order.amount}</div>
                  <div style={{fontSize:'11px', color:'#7A7068', marginTop:'2px'}}>{new Date(order.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:statusStyle.bg, borderRadius:'4px', marginBottom:'16px'}}>
                <span style={{fontSize:'13px', fontWeight:'500', color:statusStyle.color}}>{statusStyle.text}</span>
                {order.status === 'confirmed' && <TimeLeft deadline={order.deadline}/>}
              </div>

              {order.status === 'confirmed' && (
                <div>
                  <p style={{fontSize:'12px', color:'#7A7068', marginBottom:'12px', lineHeight:'1.6'}}>
                    Once you receive the item, confirm below. If there is an issue, open a dispute within 24h. After 24h, payment is automatically released to the seller.
                  </p>
                  <div style={{display:'flex', gap:'10px'}}>
                    <button
                      onClick={() => confirmReceived(order.id)}
                      disabled={confirming === order.id}
                      style={{flex:1, background:'#2D5A3D', color:'white', border:'none', padding:'12px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px'}}>
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
                <div style={{display:'flex', gap:'10px'}}>
                  <button onClick={() => window.location.href='/chat'} style={{padding:'10px 16px', border:'1.5px solid #D9CEBC', background:'white', color:'#7A7068', borderRadius:'2px', cursor:'pointer', fontSize:'13px'}}>
                    💬 View chat
                  </button>
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
        })}
      </div>
    </main>
  )
}