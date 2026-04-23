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

export default function SellerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [seller, setSeller] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSeller()
  }, [id])

  async function loadSeller() {
    const { data: sellerData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (sellerData) {
      setSeller(sellerData)

      const { data: listingsData } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
      if (listingsData) setListings(listingsData)

      if (sellerData.email) {
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*')
          .eq('seller_email', sellerData.email)
          .order('created_at', { ascending: false })
        if (reviewsData) setReviews(reviewsData)
      }
    }
    setLoading(false)
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  if (!seller) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300'}}>Seller not found</h2>
        <button onClick={() => window.location.href='/'} style={{marginTop:'16px', background:'#2D5A3D', color:'white', border:'none', padding:'12px 24px', cursor:'pointer', borderRadius:'2px', fontSize:'13px'}}>Back to home</button>
      </div>
    </div>
  )

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <button onClick={() => window.history.back()} style={{fontSize:'13px', color:'#7A7068', background:'none', border:'none', cursor:'pointer'}}>← Back</button>
      </nav>

      {/* SELLER HEADER */}
      <div style={{background:'white', padding:'40px 5%', borderBottom:'1px solid #D9CEBC'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto', display:'flex', alignItems:'center', gap:'24px', flexWrap:'wrap'}}>
          <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#2D5A3D', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'32px', fontWeight:'600'}}>
            {seller.full_name?.[0]?.toUpperCase() || seller.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div style={{flex:1}}>
            <h1 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', marginBottom:'4px'}}>{seller.full_name || seller.email?.split('@')[0]}</h1>
            <div style={{fontSize:'13px', color:'#7A7068'}}>📍 {listings[0]?.location || 'Qatar'}</div>
            <div style={{display:'flex', gap:'24px', marginTop:'10px', flexWrap:'wrap'}}>
              {avgRating && (
                <div>
                  <div style={{fontSize:'18px', color:'#2D5A3D', fontWeight:'600'}}>⭐ {avgRating}</div>
                  <div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase'}}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
                </div>
              )}
              <div>
                <div style={{fontSize:'18px', color:'#2D5A3D', fontWeight:'600'}}>{listings.length}</div>
                <div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase'}}>Active listings</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'40px 5%'}}>
        
        {/* LISTINGS */}
        <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Active Listings</h2>
        {listings.length === 0 ? (
          <div style={{background:'white', padding:'40px', borderRadius:'4px', textAlign:'center', marginBottom:'40px'}}>
            <p style={{fontSize:'14px', color:'#7A7068'}}>No active listings</p>
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'16px', marginBottom:'40px'}}>
            {listings.map(p => (
              <div key={p.id} onClick={() => window.location.href=`/product/${p.id}`} style={{background:'white', borderRadius:'4px', overflow:'hidden', cursor:'pointer', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'44px', overflow:'hidden'}}>
                  {p.image_url ? <img src={p.image_url} alt={p.title} style={{width:'100%', height:'100%', objectFit:'cover'}}/> : <span>{categoryEmojis[p.category] || '📦'}</span>}
                </div>
                <div style={{padding:'12px'}}>
                  <div style={{fontSize:'13px', fontWeight:'400', marginBottom:'6px', lineHeight:'1.3'}}>{p.title}</div>
                  <div style={{fontSize:'15px', fontWeight:'500', color:'#2D5A3D'}}>QAR {p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS */}
        <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Reviews</h2>
        {reviews.length === 0 ? (
          <div style={{background:'white', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
            <p style={{fontSize:'14px', color:'#7A7068'}}>No reviews yet</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {reviews.map(r => (
              <div key={r.id} style={{background:'white', padding:'16px', borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <div style={{fontSize:'15px', color:'#2D5A3D', marginBottom:'6px'}}>{'⭐'.repeat(r.rating)}</div>
                {r.comment && <p style={{fontSize:'13px', color:'#4A4A4A', lineHeight:'1.7', marginBottom:'4px'}}>{r.comment}</p>}
                <div style={{fontSize:'11px', color:'#7A7068'}}>{new Date(r.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}