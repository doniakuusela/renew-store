'use client'
import { useState, useEffect, use } from 'react'
import { supabase } from '../../lib/supabase'

const categoryEmojis: any = {
  'Fashion': '👗',
  'Furniture': '🛋️',
  'Kids': '🧸',
  'Sports': '🚴',
  'Electronics': '📱',
  'Other': '📦',
}

export default function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [user, setUser] = useState<any>(null)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    loadProduct()
  }, [id])

  async function loadProduct() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (!error && data) {
      setProduct(data)
    }
    setLoading(false)
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  if (!product) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'48px', marginBottom:'16px'}}>🔍</div>
        <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300'}}>Product not found</h2>
        <button onClick={() => window.location.href='/'} style={{marginTop:'16px', background:'#2D5A3D', color:'white', border:'none', padding:'12px 24px', cursor:'pointer', borderRadius:'2px', fontSize:'13px'}}>Back to listings</button>
      </div>
    </div>
  )

  function handleBuyNow() {
    if (!user) {
      window.location.href = '/auth'
      return
    }
    const emoji = categoryEmojis[product.category] || '📦'
    window.location.href = `/checkout?product=${product.id}&amount=${product.price}&title=${encodeURIComponent(product.title)}&emoji=${encodeURIComponent(emoji)}&seller_email=renewstoreqa@gmail.com`
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <button onClick={() => window.location.href='/'} style={{fontSize:'13px', color:'#7A7068', background:'none', border:'none', cursor:'pointer'}}>← Back to listings</button>
      </nav>
      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'40px 8%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px'}}>
        
        <div>
          <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'120px', marginBottom:'12px', overflow:'hidden'}}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.title} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
            ) : (
              <span>{categoryEmojis[product.category] || '📦'}</span>
            )}
          </div>
        </div>
        
        <div>
          <div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'6px'}}>{product.category}</div>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'32px', fontWeight:'300', lineHeight:'1.2', marginBottom:'16px', color:'#1E1E1E'}}>{product.title}</h1>
          <div style={{fontSize:'32px', fontWeight:'600', color:'#2D5A3D', marginBottom:'20px'}}>QAR {product.price.toLocaleString()}</div>
          <div style={{display:'flex', gap:'8px', marginBottom:'20px', flexWrap:'wrap'}}>
            <span style={{background:'#EBF2EC', color:'#2D5A3D', padding:'5px 12px', borderRadius:'2px', fontSize:'12px', fontWeight:'500'}}>{product.condition}</span>
            <span style={{background:'#F5F0E8', color:'#7A7068', padding:'5px 12px', borderRadius:'2px', fontSize:'12px'}}>📍 {product.location}</span>
            <span style={{background:'#F5F0E8', color:'#7A7068', padding:'5px 12px', borderRadius:'2px', fontSize:'12px'}}>🔒 Buyer protected</span>
          </div>
          {product.description && (
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'24px', paddingBottom:'24px', borderBottom:'1px solid #D9CEBC'}}>{product.description}</p>
          )}
          <div style={{display:'flex', gap:'10px'}}>
            <button onClick={handleBuyNow} style={{flex:1, background:'#2D5A3D', color:'white', border:'none', padding:'16px', fontSize:'14px', fontWeight:'500', cursor:'pointer', borderRadius:'2px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
              Buy Now — QAR {product.price.toLocaleString()}
            </button>
            <button style={{padding:'16px 18px', border:'1.5px solid #D9CEBC', background:'white', borderRadius:'2px', cursor:'pointer', fontSize:'18px'}}>♡</button>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'6px', marginTop:'12px', fontSize:'11px', color:'#7A7068', justifyContent:'center'}}>
            🔒 Secure payment · 24h buyer protection · Powered by MyFatoorah
          </div>
        </div>
      </div>
    </main>
  )
}