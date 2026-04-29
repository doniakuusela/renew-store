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
  const [imageUrls, setImageUrls] = useState<string[]>([])

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
    const files = Array.from(e.target.files) as any[]
    if (files.length === 0) return
    if (imageUrls.length + files.length > 5) {
      setMessage('Maximum 5 images per listing')
      return
    }
    
    setUploading(true)
    setMessage('')
    
    const newUrls: string[] = []
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage(`${file.name} is too large (max 5MB)`)
        continue
      }
      
      const fileName = `${user.id}/${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('listing-images').upload(fileName, file)
      
      if (!error) {
        const { data } = supabase.storage.from('listing-images').getPublicUrl(fileName)
        newUrls.push(data.publicUrl)
      }
    }
    
    setImageUrls(prev => [...prev, ...newUrls])
    setMessage(`✅ ${newUrls.length} image(s) uploaded!`)
    setUploading(false)
  }

  function removeImage(index: number) {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    if (!title || !price) {
      setMessage('Please fill in title and price')
      return
    }
    if (imageUrls.length === 0) {
      setMessage('Please add at least one photo')
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
      image_url: imageUrls[0],
      image_urls: imageUrls,
      status: 'pending'
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      // Notify admin
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'renewstoreqa@gmail.com',
          subject: '🆕 New listing pending approval',
          message: `A new listing "${title}" has been submitted by ${user.email} for QAR ${price}. Please review it in the admin panel.`,
          type: 'new_message'
        })
      })

      setMessage('✅ Listing submitted! It will be reviewed and published shortly.')
      setTimeout(() => window.location.href = '/my-listings', 1500)
    }
    setLoading(false)
  }

  if (!user) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#1E1E1E', textDecoration:'none'}}>← Back</a>
      </nav>
      <div style={{background:'#2D5A3D', padding:'48px 8%'}}>
        <h1 style={{fontFamily:'Georgia,serif', fontSize:'clamp(32px, 5vw, 48px)', fontWeight:'300', color:'white', lineHeight:'1.1'}}>List your item</h1>
        <p style={{fontSize:'15px', color:'rgba(255,255,255,0.7)', marginTop:'10px'}}>Free. Reviewed within 24 hours.</p>
      </div>
      <div style={{maxWidth:'680px', margin:'0 auto', padding:'48px 8%'}}>
        
        {/* IMAGE UPLOAD */}
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Photos * (max 5)</label>
          
          {imageUrls.length > 0 && (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))', gap:'10px', marginBottom:'10px'}}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{position:'relative', aspectRatio:'1', background:'#EDE6D6', borderRadius:'4px', overflow:'hidden'}}>
                  <img src={url} alt={`Photo ${i+1}`} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                  <button onClick={() => removeImage(i)} style={{position:'absolute', top:'4px', right:'4px', background:'rgba(0,0,0,0.7)', color:'white', border:'none', width:'24px', height:'24px', borderRadius:'50%', cursor:'pointer', fontSize:'12px'}}>✕</button>
                  {i === 0 && <div style={{position:'absolute', bottom:'4px', left:'4px', background:'#2D5A3D', color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'2px'}}>MAIN</div>}
                </div>
              ))}
            </div>
          )}
          
          {imageUrls.length < 5 && (
            <label style={{display:'block', border:'2px dashed #D9CEBC', padding:'20px', textAlign:'center', cursor:'pointer', borderRadius:'4px', background:'white'}}>
              <div style={{fontSize:'28px', marginBottom:'6px'}}>📷</div>
              <p style={{fontSize:'13px', color:'#1E1E1E'}}>{uploading ? 'Uploading...' : `Click to add photo${imageUrls.length > 0 ? 's' : ''}`}</p>
              <p style={{fontSize:'11px', color:'#1E1E1E', marginTop:'4px'}}>JPG, PNG — max 5MB each · {5 - imageUrls.length} more allowed</p>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display:'none'}}/>
            </label>
          )}
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}} placeholder="e.g. IKEA desk"/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', minHeight:'100px', resize:'vertical', fontFamily:'sans-serif', borderRadius:'2px'}} placeholder="Describe your item…"/>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Price (QAR) *</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}} placeholder="0"/>
          </div>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px', color:'#1E1E1E'}}>
              <option>Women's Fashion</option>
              <option>Men's Fashion</option>
              <option>Furniture</option>
              <option>Kids</option>
              <option>Sports</option>
              <option>Designer</option>
              <option>Hobbies & Collections</option>
              <option>Books & Games</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}}>
              <option>New with tags</option>
              <option>Like new</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div>
            <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#1E1E1E', marginBottom:'6px'}}>Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'11px 14px', fontSize:'14px', outline:'none', boxSizing:'border-box', background:'white', borderRadius:'2px'}}>
              <option>Doha (Central)</option>
              <option>West Bay</option>
              <option>The Pearl</option>
              <option>Al Waab</option>
              <option>Madinat Khalifa</option>
              <option>Al Sadd</option>
              <option>Al Rayyan</option>
              <option>Lusail</option>
              <option>Al Wakrah</option>
              <option>Al Khor</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        {message && <div style={{background: message.includes('Error') || message.includes('error') || message.includes('large') || message.includes('Maximum') ? '#FEE2E2' : '#EBF2EC', color: message.includes('Error') || message.includes('error') || message.includes('large') || message.includes('Maximum') ? '#DC2626' : '#2D5A3D', padding:'12px', fontSize:'13px', marginBottom:'16px', borderRadius:'4px'}}>{message}</div>}
        <button onClick={handleSubmit} disabled={loading || uploading} style={{width:'100%', background:'#2D5A3D', color:'white', border:'none', padding:'15px', fontSize:'13px', fontWeight:'500', textTransform:'uppercase', cursor:'pointer', borderRadius:'2px'}}>
          {loading ? 'Publishing...' : 'Publish Listing — Free'}
        </button>
      </div>
    </main>
  )
}