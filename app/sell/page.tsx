'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Sell() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Fashion')
  const [condition, setCondition] = useState('Like new')
  const [location, setLocation] = useState('Doha')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    setMessage('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMessage('Please log in first!')
      setLoading(false)
      return
    }
    const { error } = await supabase.from('listings').insert({
      user_id: user.id,
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      location,
      status: 'active'
    })
    if (error) setMessage('Error: ' + error.message)
    else setMessage('Listing published successfully!')
    setLoading(false)
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>
      <div style={{background:'#2D5A3D', padding:'48px 8%'}}>
        <h1 style={{fontFamily:'Georgia,serif', fontSize:'48px', fontWeight:'300', color:'white', lineHeight:'1.1'}}>List your item.</h1>
        <p style={{fontSize:'15px', color:'rgba(255,255,255,0.65)', marginTop:'10px'}}>Free. Goes live instantly.</p>
      </div>
      <div style={{maxWidth:'680px', margin:'0 auto', padding:'48px 8%'}}>
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white'}} placeholder="e.g. IKEA desk"/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', minHeight:'100px', resize:'vertical', fontFamily:'sans-serif'}} placeholder="Describe your item…"/>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Price (QAR)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white'}} placeholder="0"/>
          </div>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white'}}>
              <option>Fashion</option>
              <option>Furniture & Home</option>
              <option>Baby & Kids</option>
              <option>Sports & Outdoors</option>
              <option>Electronics</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white'}}>
              <option>New with tags</option>
              <option>Like new</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white'}}>
              <option>Doha</option>
              <option>Al Rayyan</option>
              <option>Lusail</option>
              <option>Al Wakrah</option>
              <option>Al Khor</option>
              <option>Mesaieed</option>
            </select>
          </div>
        </div>
        {message && <div style={{background: message.includes('Error') ? '#FEE2E2' : '#EBF2EC', color: message.includes('Error') ? '#DC2626' : '#2D5A3D', padding:'12px', fontSize:'13px', marginBottom:'16px'}}>{message}</div>}
        <button onClick={handleSubmit} disabled={loading} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'15px', fontSize:'13px', fontWeight:'500', textTransform:'uppercase', cursor:'pointer'}}>
          {loading ? 'Publishing...' : 'Publish Listing — Free'}
        </button>
      </div>
    </main>
  )
}