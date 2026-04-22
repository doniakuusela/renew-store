'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function Chat() {
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth'
        return
      }
      setUser(session.user)
      loadOrders(session.user.id, session.user.email)
    })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadOrders(userId: string, userEmail: string) {
    // Load orders where user is buyer OR seller
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .or(`buyer_id.eq.${userId},seller_email.eq.${userEmail}`)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setOrders(data)
      if (data.length > 0) {
        setSelectedOrder(data[0])
        loadMessages(data[0].id)
      }
    }
    setLoading(false)
  }

  async function loadMessages(orderId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true })
    
    if (!error && data) {
      setMessages(data)
    }
  }

  async function selectOrder(order: any) {
    setSelectedOrder(order)
    loadMessages(order.id)
  }

  async function sendMessage() {
    if (!newMessage.trim() || !selectedOrder) return

    const isBuyer = user.id === selectedOrder.buyer_id
    const receiverEmail = isBuyer ? selectedOrder.seller_email : selectedOrder.buyer_email

    // Save message to database
    const { error } = await supabase.from('chat_messages').insert({
      order_id: selectedOrder.id,
      sender_id: user.id,
      content: newMessage,
      buyer_email: selectedOrder.buyer_email,
      seller_email: selectedOrder.seller_email
    })

    if (!error) {
      // Send email notification to the other party
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: receiverEmail,
          subject: '💬 New message — Renew Store',
          message: `You have a new message about "${selectedOrder.product_title}": "${newMessage}"`,
          type: 'new_message'
        })
      })

      setNewMessage('')
      loadMessages(selectedOrder.id)
    }
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', height:'100vh', display:'flex', flexDirection:'column'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back to listings</a>
      </nav>

      <div style={{display:'flex', flex:1, overflow:'hidden'}}>
        
        {/* SIDEBAR */}
        <div style={{width:'280px', background:'white', borderRight:'1px solid #D9CEBC', display:'flex', flexDirection:'column', flexShrink:0}}>
          <div style={{padding:'20px', borderBottom:'1px solid #D9CEBC'}}>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'20px', fontWeight:'400'}}>Messages</h2>
            <p style={{fontSize:'12px', color:'#7A7068', marginTop:'4px'}}>{orders.length} conversation{orders.length !== 1 ? 's' : ''}</p>
          </div>
          <div style={{flex:1, overflowY:'auto'}}>
            {orders.length === 0 ? (
              <div style={{padding:'40px 20px', textAlign:'center'}}>
                <div style={{fontSize:'36px', marginBottom:'12px'}}>💬</div>
                <p style={{fontSize:'13px', color:'#7A7068', lineHeight:'1.6'}}>No messages yet. Chat opens automatically after purchase.</p>
              </div>
            ) : (
              orders.map(order => {
                const isBuyer = user.id === order.buyer_id
                const otherParty = isBuyer ? order.seller_email : order.buyer_email
                const isSelected = selectedOrder?.id === order.id
                return (
                  <div key={order.id} onClick={() => selectOrder(order)} style={{padding:'14px 18px', background: isSelected ? '#EBF2EC' : 'white', borderLeft: isSelected ? '3px solid #2D5A3D' : '3px solid transparent', cursor:'pointer', borderBottom:'1px solid #F5F0E8'}}>
                    <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'2px'}}>{order.product_title}</div>
                    <div style={{fontSize:'11px', color:'#7A7068', marginBottom:'2px'}}>{isBuyer ? 'Seller' : 'Buyer'}: {otherParty?.split('@')[0]}</div>
                    <div style={{fontSize:'11px', color:'#2D5A3D', fontWeight:'500'}}>QAR {order.amount}</div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* CHAT AREA */}
        <div style={{flex:1, display:'flex', flexDirection:'column'}}>
          
          {!selectedOrder ? (
            <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', padding:'40px'}}>
              <div style={{fontSize:'64px', marginBottom:'16px'}}>💬</div>
              <h3 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'8px'}}>No conversations yet</h3>
              <p style={{fontSize:'14px', color:'#7A7068', textAlign:'center', maxWidth:'400px'}}>Chat becomes available after you complete a purchase or someone buys your item.</p>
            </div>
          ) : (
            <>
              {/* CHAT HEADER */}
              <div style={{padding:'16px 24px', background:'white', borderBottom:'1px solid #D9CEBC', display:'flex', alignItems:'center', gap:'14px'}}>
                <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#2D5A3D', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'16px', fontWeight:'600'}}>
                  {(user.id === selectedOrder.buyer_id ? selectedOrder.seller_email : selectedOrder.buyer_email)?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div style={{fontSize:'14px', fontWeight:'500'}}>{user.id === selectedOrder.buyer_id ? selectedOrder.seller_email?.split('@')[0] : selectedOrder.buyer_email?.split('@')[0]}</div>
                  <div style={{fontSize:'11px', color:'#7A7068'}}>About: {selectedOrder.product_title} · QAR {selectedOrder.amount}</div>
                </div>
                <div style={{marginLeft:'auto', background:'#EBF2EC', color:'#2D5A3D', padding:'6px 12px', borderRadius:'2px', fontSize:'11px', fontWeight:'500'}}>
                  ✅ {selectedOrder.status}
                </div>
              </div>

              {/* MESSAGES */}
              <div style={{flex:1, overflowY:'auto', padding:'24px', display:'flex', flexDirection:'column', gap:'12px'}}>
                {messages.length === 0 ? (
                  <div style={{textAlign:'center', padding:'40px', color:'#7A7068'}}>
                    <p style={{fontSize:'14px', lineHeight:'1.7'}}>No messages yet. Start the conversation!</p>
                    <p style={{fontSize:'12px', marginTop:'8px'}}>💡 Tip: Agree on a pickup time and location.</p>
                  </div>
                ) : (
                  messages.map(msg => {
                    const isMe = msg.sender_id === user.id
                    return (
                      <div key={msg.id} style={{display:'flex', justifyContent: isMe ? 'flex-end' : 'flex-start'}}>
                        <div style={{maxWidth:'65%'}}>
                          <div style={{padding:'11px 15px', borderRadius:'12px', fontSize:'13px', lineHeight:'1.55', background: isMe ? '#2D5A3D' : 'white', color: isMe ? 'white' : '#1E1E1E', borderBottomRightRadius: isMe ? '3px' : '12px', borderBottomLeftRadius: isMe ? '12px' : '3px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                            {msg.content}
                          </div>
                          <div style={{fontSize:'10px', color:'#7A7068', marginTop:'4px', textAlign: isMe ? 'right' : 'left'}}>
                            {new Date(msg.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef}/>
              </div>

              {/* INPUT */}
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
            </>
          )}

        </div>
      </div>
    </main>
  )
}