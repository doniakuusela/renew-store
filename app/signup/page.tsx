'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email for a confirmation link! 📧')
    setLoading(false)
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'white', padding:'48px', borderRadius:'4px', width:'100%', maxWidth:'420px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', marginBottom:'8px'}}>🌿 Renew Store</div>
          <h1 style={{fontSize:'28px', fontWeight:'600', fontFamily:'Georgia, serif', color:'#1E1E1E'}}>Create account</h1>
        </div>
        <div style={{marginBottom:'16px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.1em', color:'#7A7068', marginBottom:'6px'}}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={{width:'100%', border:'1.5px solid #D9CEBC', borderRadius:'2px', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            placeholder="your@email.com"/>
        </div>
        <div style={{marginBottom:'24px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.1em', color:'#7A7068', marginBottom:'6px'}}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{width:'100%', border:'1.5px solid #D9CEBC', borderRadius:'2px', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            placeholder="••••••••"/>
        </div>
        {message && <div style={{background: message.includes('error') ? '#FEE2E2' : '#EBF2EC', color: message.includes('error') ? '#DC2626' : '#2D5A3D', padding:'12px', borderRadius:'2px', fontSize:'13px', marginBottom:'16px'}}>{message}</div>}
        <button onClick={handleSignUp} disabled={loading}
          style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'14px', fontSize:'13px', fontWeight:'500', letterSpacing:'0.05em', textTransform:'uppercase', cursor:'pointer', borderRadius:'2px'}}>
          {loading ? 'Please wait...' : 'Create account'}
        </button>
        <p style={{textAlign:'center', marginTop:'20px', fontSize:'13px', color:'#7A7068'}}>
          Already have an account?{' '}
          <button onClick={() => window.location.href='/auth'} style={{background:'none', border:'none', color:'#2D5A3D', cursor:'pointer', fontWeight:'500'}}>
            Log in
          </button>
        </p>
        <p style={{textAlign:'center', marginTop:'12px', fontSize:'11px', color:'#7A7068'}}>
          By signing up you agree to our{' '}
          <a href="/terms" style={{color:'#2D5A3D'}}>Terms of Use</a>
          {' '}and{' '}
          <a href="/privacy" style={{color:'#2D5A3D'}}>Privacy Policy</a>
        </p>
      </div>
    </main>
  )
}