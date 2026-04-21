'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Sell() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Fashion')
  const [condition, setCondition] = useState('Like new')
  const [location, setLocation] = useState('Doha')
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth'
        return
      }
      setUser(session.user)
    })
  }, [])

  async function handleImageUpload(e: any) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image too large (max 5MB)')
      return
    }
    setUploading(true)
    setMessage('')
    
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('listing-images').upload(fileName, file)
    
    if (error) {
      setMessage('Upload error: ' + error.message)
    } else {
      const { data } = supabase.storage.from('listing-images').getPublicUrl(fileName)
      setImageUrl(data.publicUrl)
      setMessage('✅ Image uploaded!')
    }
    setUploading(false)
  }

  async function handleSubmit() {
    if (!title || !price) {
      setMessage('Please fill in title and price')
      return
    }
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('listings').insert({
      user_id: user.id,
      title: title,
      description: description,
      price: parseFloat(price),
      category: category,
      condition: condition,
      location: location,
      image_url: imageUrl,
      status: 'pending'
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('✅ Listing submitted! It will be reviewed and published shortly.')
      setTimeout(() => window.location.href = '/', 1500)
    }
    setLoading(false)
  }

  if (!user) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>
      <div style={{background:'#2D5A3D', padding:'48px 8%'}}>
        <h1 style={{fontFamily:'Georgia,serif', fontSize:'clamp(32px, 5vw, 48px)', fontWeight:'300', color:'white', lineHeight:'1.1'}}>List your item</h1>
        <p style={{fontSize:'15px', color:'rgba(255,255,255,0.7)', marginTop:'10px'}}>Free. Reviewed within 24 hours.</p>
      </div>
      <div style={{maxWidth:'680px', margin:'0 auto', padding:'48px 8%'}}>
        
        {/* IMAGE UPLOAD */}
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Photo *</label>
          {imageUrl ? (
            <div style={{position:'relative', width:'100%', aspectRatio:'1', maxWidth:'280px', background:'#EDE6D6', borderRadius:'4px', overflow:'hidden'}}>
              <img src={imageUrl} alt="Preview" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
              <button onClick={() => setImageUrl('')} style={{position:'absolute', top:'8px', right:'8px', background:'rgba(0,0,0,0.7)', color:'white', border:'none', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'16px'}}>✕</button>
            </div>
          ) : (
            <label style={{display:'block', border:'2px dashed #D9CEBC', padding:'32px', textAlign:'center', cursor:'pointer', borderRadius:'4px', background:'white'}}>
              <div style={{fontSize:'40px', marginBottom:'8px'}}>📷</div>
              <p style={{fontSize:'14px', color:'#7A7068'}}>{uploading ? 'Uploading...' : 'Click to add photo'}</p>
              <p style={{fontSize:'11px', color:'#7A7068', marginTop:'4px'}}>JPG, PNG — max 5MB</p>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>
            </label>
          )}
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}} placeholder="e.g. IKEA desk"/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', minHeight:'100px', resize:'vertical', fontFamily:'sans-serif', borderRadius:'2px'}} placeholder="Describe your item…"/>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Price (QAR) *</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}} placeholder="0"/>
          </div>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}}>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Kids</option>
              <option>Sports</option>
              <option>Electronics</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}}>
              <option>New with tags</option>
              <option>Like new</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}}>
              <option>Doha</option>
              <option>Al Rayyan</option>
              <option>Lusail</option>
              <option>Al Wakrah</option>
              <option>Al Khor</option>
            </select>
          </div>
        </div>
        {message && <div style={{background: message.includes('Error') || message.includes('error') || message.includes('large') ? '#FEE2E2' : '#EBF2EC', color: message.includes('Error') || message.includes('error') || message.includes('large') ? '#DC2626' : '#2D5A3D', padding:'12px', fontSize:'13px', marginBottom:'16px', borderRadius:'4px'}}>{message}</div>}
        <button onClick={handleSubmit} disabled={loading || uploading} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'15px', fontSize:'13px', fontWeight:'500', textTransform:'uppercase', cursor:'pointer', borderRadius:'2px'}}>
          {loading ? 'Publishing...' : 'Publish Listing — Free'}
        </button>
      </div>
    </main>
  )
}