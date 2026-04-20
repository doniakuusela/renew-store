'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        setLoading(false)
        loadDemoMessages()
      } else {
        supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            setUser(session.user)
            setLoading(false)
            loadDemoMessages()
          } else if (event === 'SIGNED_OUT') {
            window.location.href = '/auth'
          }
        })
        setTimeout(() => {
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) window.location.href = '/auth'
          })
        }, 2000)
      }
    })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function loadDemoMessages() {
    setMessages([
      { id: 1, sender_id: 'other', message: 'Hi! Your payment was successful. When can we meet for the handover?', created_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 2, sender_id: 'me', message: 'Great! I am available tomorrow afternoon in Al Waab area.', created_at: new Date(Date.now() - 1800000).toISOString() },
      { id: 3, sender_id: 'other', message: 'Perfect, lets meet at 4pm near Villagio Mall?', created_at: new Date(Date.now() - 900000).toISOString() },
    ])
  }

  async function sendMessage() {
    if (!newMessage.trim()) return
    const msg = {
      id: Date.now(),
      sender_id: 'me',
      message: newMessage,
      created_at: new Date().toISOString()
    }
    setMessages(prev => [...prev, msg])
    
    // Send email notification to other party
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'renewstoreqa@gmail.com',
        subject: '💬 New message — Renew Store',
        message: `You have a new message: "${newMessage}"`,
        type: 'new_message'
      })
    })

    setNewMessage('')
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', height:'100vh', display:'flex', flexDirection:'column'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back to listings</a>
      </nav>
      <div style={{display:'flex', flex:1, overflow:'hidden'}}>
        <div style={{width:'280px', background:'white', borderRight:'1px solid #D9CEBC', display:'flex', flexDirection:'column', flexShrink:0}}>
          <div style={{padding:'20px', borderBottom:'1px solid #D9CEBC'}}>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'20px', fontWeight:'400'}}>Messages</h2>
            <p style={{fontSize:'12px', color:'#7A7068', marginTop:'4px'}}>Available after purchase</p>
          </div>
          <div style={{flex:1, overflowY:'auto'}}>
            <div style={{padding:'14px 18px', background:'#EBF2EC', borderLeft:'3px solid #2D5A3D', cursor:'pointer'}}>
              <div style={{fontSize:'13px', fontWeight:'500'}}>Zara Structured Tote Bag</div>
              <div style={{fontSize:'11px', color:'#7A7068', marginTop:'2px'}}>Seller: Layla Q.</div>
              <div style={{fontSize:'11px', color:'#2D5A3D', marginTop:'2px'}}>✅ Payment confirmed</div>
            </div>
          </div>
        </div>
        <div style={{flex:1, display:'flex', flexDirection:'column'}}>
          <div style={{padding:'16px 24px', background:'white', borderBottom:'1px solid #D9CEBC', display:'flex', alignItems:'center', gap:'14px'}}>
            <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#2D5A3D', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'16px', fontWeight:'600'}}>L</div>
            <div>
              <div style={{fontSize:'14px', fontWeight:'500'}}>Layla Q.</div>
              <div style={{fontSize:'11px', color:'#7A7068'}}>About: Zara Structured Tote Bag · QAR 95</div>
            </div>
            <div style={{marginLeft:'auto', background:'#EBF2EC', color:'#2D5A3D', padding:'6px 12px', borderRadius:'2px', fontSize:'11px', fontWeight:'500'}}>
              ✅ Purchase confirmed
            </div>
          </div>
          <div style={{flex:1, overflowY:'auto', padding:'24px', display:'flex', flexDirection:'column', gap:'12px'}}>
            {messages.map(msg => (
              <div key={msg.id} style={{display:'flex', justifyContent: msg.sender_id === 'me' ? 'flex-end' : 'flex-start'}}>
                <div style={{maxWidth:'65%'}}>
                  <div style={{padding:'11px 15px', borderRadius:'12px', fontSize:'13px', lineHeight:'1.55', background: msg.sender_id === 'me' ? '#2D5A3D' : 'white', color: msg.sender_id === 'me' ? 'white' : '#1E1E1E', borderBottomRightRadius: msg.sender_id === 'me' ? '3px' : '12px', borderBottomLeftRadius: msg.sender_id === 'me' ? '12px' : '3px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                    {msg.message}
                  </div>
                  <div style={{fontSize:'10px', color:'#7A7068', marginTop:'4px', textAlign: msg.sender_id === 'me' ? 'right' : 'left'}}>
                    {new Date(msg.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
          <div style={{padding:'16px 20px', background:'white', borderTop:'1px solid #D9CEBC', display:'flex', gap:'10px', alignItems:'center'}}>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message…"
              style={{flex:1, border:'1.5px solid #D9CEBC', borderRadius:'2px', padding:'11px 14px', fontSize:'13px', outline:'none', fontFamily:'sans-serif'}}
            />
            <button onClick={sendMessage} style={{background:'#2D5A3D', color:'white', border:'none', padding:'11px 20px', borderRadius:'2px', fontSize:'13px', fontWeight:'500', cursor:'pointer', fontFamily:'sans-serif'}}>
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
