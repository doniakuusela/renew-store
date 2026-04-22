'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [payoutMethod, setPayoutMethod] = useState('Fawran')
  const [fawraNumber, setfawraNumber] = useState('')
  const [iban, setIban] = useState('')
  const [accountName, setAccountName] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth'
        return
      }
      setUser(session.user)
      
      // Load existing profile
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (data) {
        setFullName(data.full_name || '')
        setPhone(data.phone || '')
        setPayoutMethod(data.payout_method || 'Fawran')
        setfawraNumber(data.fawra_number || '')
        setIban(data.iban || '')
        setAccountName(data.account_name || '')
      }
      setLoading(false)
    })
  }, [])

  async function handleSave() {
    if (!fullName || !phone) {
      setMessage('Please fill in your full name and phone number')
      return
    }
    
    if (payoutMethod === 'Fawran' && !fawraNumber) {
      setMessage('Please enter your Fawran number')
      return
    }
    
    if (payoutMethod === 'bank' && (!iban || !accountName)) {
      setMessage('Please enter your IBAN and account name')
      return
    }

    setSaving(true)
    setMessage('')

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      phone: phone,
      payout_method: payoutMethod,
      fawra_number: payoutMethod === 'Fawran' ? fawraNumber : null,
      iban: payoutMethod === 'bank' ? iban : null,
      account_name: payoutMethod === 'bank' ? accountName : null,
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('✅ Profile saved successfully!')
    }
    setSaving(false)
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>

      <div style={{maxWidth:'640px', margin:'0 auto', padding:'48px 8%'}}>
        <h1 style={{fontFamily:'Georgia, serif', fontSize:'36px', fontWeight:'300', marginBottom:'8px', color:'#1E1E1E'}}>My Profile</h1>
        <p style={{fontSize:'14px', color:'#7A7068', marginBottom:'32px'}}>Update your information and payout preferences</p>

        <div style={{background:'white', padding:'32px', borderRadius:'4px', marginBottom:'20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'22px', fontWeight:'400', marginBottom:'20px'}}>Personal Information</h2>
          
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Email</label>
            <input value={user?.email || ''} disabled style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', background:'#F5F0E8', color:'#7A7068', boxSizing:'border-box', borderRadius:'2px'}}/>
          </div>

          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Full Name *</label>
            <input value={fullName} onChange={e => setFullName(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px'}} placeholder="e.g. Sara Al-Ahmed"/>
          </div>

          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Phone *</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px'}} placeholder="+974 XXXX XXXX"/>
          </div>
        </div>

        <div style={{background:'white', padding:'32px', borderRadius:'4px', marginBottom:'20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'22px', fontWeight:'400', marginBottom:'8px'}}>Payout Method</h2>
          <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'20px'}}>How would you like to receive payments when you sell items?</p>

          <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
            <button 
              onClick={() => setPayoutMethod('Fawran')}
              style={{flex:1, padding:'14px', border: payoutMethod === 'Fawran' ? '2px solid #2D5A3D' : '1.5px solid #D9CEBC', background: payoutMethod === 'Fawran' ? '#EBF2EC' : 'white', borderRadius:'4px', cursor:'pointer', fontSize:'13px', fontWeight: payoutMethod === 'Fawran' ? '600' : '400', color: payoutMethod === 'Fawran' ? '#2D5A3D' : '#4A4A4A'}}>
              💰 Fawran (faster)
            </button>
            <button 
              onClick={() => setPayoutMethod('bank')}
              style={{flex:1, padding:'14px', border: payoutMethod === 'bank' ? '2px solid #2D5A3D' : '1.5px solid #D9CEBC', background: payoutMethod === 'bank' ? '#EBF2EC' : 'white', borderRadius:'4px', cursor:'pointer', fontSize:'13px', fontWeight: payoutMethod === 'bank' ? '600' : '400', color: payoutMethod === 'bank' ? '#2D5A3D' : '#4A4A4A'}}>
              🏦 Bank transfer
            </button>
          </div>

          {payoutMethod === 'Fawran' && (
            <div>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Fawran Phone Number *</label>
              <input value={fawraNumber} onChange={e => setfawraNumber(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px'}} placeholder="+974 XXXX XXXX"/>
            </div>
          )}

          {payoutMethod === 'bank' && (
            <>
              <div style={{marginBottom:'16px'}}>
                <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>IBAN *</label>
                <input value={iban} onChange={e => setIban(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px'}} placeholder="QA12XXXXXXXXXXXXXXXXXX"/>
              </div>
              <div>
                <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Account Holder Name *</label>
                <input value={accountName} onChange={e => setAccountName(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px'}} placeholder="Full name as on bank account"/>
              </div>
            </>
          )}
        </div>

        <div style={{background:'#EBF2EC', padding:'16px', borderRadius:'4px', marginBottom:'20px'}}>
          <p style={{fontSize:'12px', color:'#2D5A3D', lineHeight:'1.7'}}>🔒 Your payment information is stored securely and only used to transfer earnings from your sales. A service fee of 20% applies to each successful sale.</p>
        </div>

        {message && <div style={{background: message.includes('Error') ? '#FEE2E2' : '#EBF2EC', color: message.includes('Error') ? '#DC2626' : '#2D5A3D', padding:'12px', fontSize:'13px', marginBottom:'16px', borderRadius:'4px'}}>{message}</div>}

        <button onClick={handleSave} disabled={saving} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'15px', fontSize:'13px', fontWeight:'500', textTransform:'uppercase', cursor:'pointer', borderRadius:'2px', letterSpacing:'0.05em'}}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </main>
  )
}