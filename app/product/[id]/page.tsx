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
  const [seller, setSeller] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

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
    const { data: productData } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (productData) {
      setProduct(productData)
      
      // Load seller profile
      if (productData.user_id) {
        const { data: sellerData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', productData.user_id)
          .single()
        if (sellerData) {
          setSeller(sellerData)
          
          // Load reviews for this seller
          if (sellerData.email) {
            const { data: reviewsData } = await supabase
              .from('reviews')
              .select('*')
              .eq('seller_email', sellerData.email)
              .order('created_at', { ascending: false })
            if (reviewsData) setReviews(reviewsData)
          }
        }
      }
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
    const sellerEmail = seller?.email || 'renewstoreqa@gmail.com'
    window.location.href = `/checkout?product=${product.id}&listing_id=${product.id}&amount=${product.price}&title=${encodeURIComponent(product.title)}&emoji=${encodeURIComponent(emoji)}&seller_email=${encodeURIComponent(sellerEmail)}`
  }

  const images = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls 
    : product.image_url ? [product.image_url] : []

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <button onClick={() => window.location.href='/'} style={{fontSize:'13px', color:'#7A7068', background:'none', border:'none', cursor:'pointer'}}>← Back to listings</button>
      </nav>
      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'40px 5%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px'}}>
        
        <div>
          {images.length > 0 ? (
            <>
              <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', borderRadius:'4px', marginBottom:'10px', overflow:'hidden'}}>
                <img src={images[selectedImage]} alt={product.title} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
              </div>
              {images.length > 1 && (
                <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                  {images.map((img: string, i: number) => (
                    <div key={i} onClick={() => setSelectedImage(i)} style={{width:'60px', height:'60px', borderRadius:'4px', overflow:'hidden', cursor:'pointer', border: selectedImage === i ? '2px solid #2D5A3D' : '2px solid transparent'}}>
                      <img src={img} alt={`${product.title} ${i+1}`} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'120px'}}>
              {categoryEmojis[product.category] || '📦'}
            </div>
          )}
        </div>
        
        <div>
          <div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'6px'}}>{product.category}</div>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', lineHeight:'1.2', marginBottom:'16px', color:'#1E1E1E'}}>{product.title}</h1>
          <div style={{fontSize:'30px', fontWeight:'600', color:'#2D5A3D', marginBottom:'20px'}}>QAR {product.price?.toLocaleString()}</div>
          <div style={{display:'flex', gap:'8px', marginBottom:'20px', flexWrap:'wrap'}}>
            <span style={{background:'#EBF2EC', color:'#2D5A3D', padding:'5px 12px', borderRadius:'2px', fontSize:'12px', fontWeight:'500'}}>{product.condition}</span>
            <span style={{background:'#F5F0E8', color:'#7A7068', padding:'5px 12px', borderRadius:'2px', fontSize:'12px'}}>📍 {product.location}</span>
            <span style={{background:'#F5F0E8', color:'#7A7068', padding:'5px 12px', borderRadius:'2px', fontSize:'12px'}}>🔒 Buyer protected</span>
          </div>
          {product.description && (
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #D9CEBC'}}>{product.description}</p>
          )}
          
          {/* SELLER INFO */}
          {seller && (
            <div style={{background:'white', padding:'16px', borderRadius:'4px', marginBottom:'20px'}}>
              <div onClick={() => window.location.href=`/seller/${seller.id}`} style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px', cursor:'pointer'}}>
                <div style={{width:'44px', height:'44px', borderRadius:'50%', background:'#2D5A3D', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'18px', fontWeight:'600'}}>
                  {seller.full_name?.[0]?.toUpperCase() || seller.email?.[0]?.toUpperCase() || '?'}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'14px', fontWeight:'500'}}>{seller.full_name || seller.email?.split('@')[0]}</div>
                  <div style={{fontSize:'11px', color:'#7A7068'}}>Seller · {seller.payout_method === 'fawra' ? 'Doha' : 'Qatar'}</div>
                </div>
                {avgRating && (
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'15px', color:'#2D5A3D', fontWeight:'600'}}>⭐ {avgRating}</div>
                    <div style={{fontSize:'11px', color:'#7A7068'}}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
                  </div>
                )}
              </div>
              
              {reviews.length > 0 && (
                <div style={{borderTop:'1px solid #F5F0E8', paddingTop:'12px', marginTop:'10px'}}>
                  <p style={{fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'8px'}}>Recent reviews</p>
                  {reviews.slice(0, 2).map(r => (
                    <div key={r.id} style={{marginBottom:'10px'}}>
                      <div style={{fontSize:'12px', color:'#2D5A3D', marginBottom:'3px'}}>{'⭐'.repeat(r.rating)}</div>
                      {r.comment && <p style={{fontSize:'12px', color:'#4A4A4A', lineHeight:'1.6'}}>{r.comment}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div style={{display:'flex', gap:'10px'}}>
            <button onClick={handleBuyNow} style={{flex:1, background:'#2D5A3D', color:'white', border:'none', padding:'16px', fontSize:'14px', fontWeight:'500', cursor:'pointer', borderRadius:'2px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
              Buy Now — QAR {product.price?.toLocaleString()}
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