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

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/' }
    })
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'white', padding:'48px', borderRadius:'4px', width:'100%', maxWidth:'420px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', marginBottom:'8px'}}>🌿 Renew Store</div>
          <h1 style={{fontSize:'28px', fontWeight:'600', fontFamily:'Georgia, serif', color:'#1E1E1E'}}>Create account</h1>
        </div>
        <button onClick={handleGoogle} style={{width:'100%', background:'white', border:'1.5px solid #D9CEBC', padding:'12px', fontSize:'14px', cursor:'pointer', borderRadius:'2px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'20px', fontFamily:'sans-serif'}}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px'}}>
          <div style={{flex:1, height:'1px', background:'#D9CEBC'}}></div>
          <span style={{fontSize:'12px', color:'#7A7068'}}>or</span>
          <div style={{flex:1, height:'1px', background:'#D9CEBC'}}></div>
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