'use client'
import { useState } from 'react'

export default function Checkout() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  async function handlePayment() {
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, amount: 100 })
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage('Payment error: ' + data.error)
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>
      <div style={{maxWidth:'640px', margin:'0 auto', padding:'60px 8%'}}>
        <div style={{background:'white', padding:'40px', borderRadius:'4px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
          <h1 style={{fontFamily:'Georgia,serif', fontSize:'28px', fontWeight:'300', marginBottom:'8px'}}>Secure Checkout</h1>
          <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'28px'}}>Protected by MyFatoorah</p>
          <div style={{background:'#EBF2EC', padding:'16px', borderRadius:'4px', marginBottom:'24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{fontSize:'13px', color:'#2D5A3D', fontWeight:'500'}}>Order total</span>
            <span style={{fontSize:'22px', fontWeight:'600', color:'#2D5A3D'}}>QAR 100</span>
          </div>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box'}} placeholder="Your name"/>
          </div>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box'}} placeholder="your@email.com"/>
          </div>
          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box'}} placeholder="+974 XXXX XXXX"/>
          </div>
          {message && <div style={{background:'#FEE2E2', color:'#DC2626', padding:'12px', fontSize:'13px', marginBottom:'16px', borderRadius:'4px'}}>{message}</div>}
          <button onClick={handlePayment} disabled={loading} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'15px', fontSize:'13px', fontWeight:'500', textTransform:'uppercase', cursor:'pointer', borderRadius:'2px'}}>
            {loading ? 'Processing...' : 'Pay with MyFatoorah'}
          </button>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', marginTop:'16px', fontSize:'11px', color:'#7A7068'}}>
            🔒 256-bit SSL encrypted · Powered by MyFatoorah
          </div>
        </div>
      </div>
    </main>
  )
}