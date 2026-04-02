'use client'
import { useState, useEffect, use } from 'react'
import { supabase } from '../../lib/supabase'

const demoProducts: any = {
  '1': { id:'1', emoji:'👗', title:'Massimo Dutti Silk Blouse', price:120, category:'Fashion', condition:'Like new', seller:'Sara A.', sellerColor:'#4A7A5A', desc:'Beautiful silk blouse in ivory. Worn twice, dry cleaned. No marks or damage. Perfect for work or events.', location:'Al Waab, Doha' },
  '2': { id:'2', emoji:'🛋️', title:'Vintage Arc Floor Lamp', price:350, category:'Furniture', condition:'Good', seller:'Ahmed K.', sellerColor:'#7A5A4A', desc:'Stunning arc floor lamp in brass finish. Minor scratch on base. Bulb included. Pickup from The Pearl.', location:'The Pearl, Doha' },
  '3': { id:'3', emoji:'🧸', title:'Stokke Tripp Trapp High Chair', price:480, category:'Kids', condition:'Like new', seller:'Mona R.', sellerColor:'#4A7A6A', desc:'Iconic Tripp Trapp in natural wood. Used for 8 months. Cleaned and ready. All original parts included.', location:'Al Rayyan' },
  '4': { id:'4', emoji:'🚴', title:'Trek Road Bike Aluminum', price:1800, category:'Sports', condition:'Good', seller:'James L.', sellerColor:'#4A5A7A', desc:'Trek Domane AL 2 in matte black. Serviced 2 months ago. New tyres, Shimano gearing.', location:'Lusail' },
  '5': { id:'5', emoji:'👜', title:'Zara Structured Tote Bag', price:95, category:'Fashion', condition:'Like new', seller:'Layla Q.', sellerColor:'#7A4A6A', desc:'Classic structured tote in camel leather-look. Used only 3 times. No marks. Comes with dust bag.', location:'West Bay, Doha' },
  '6': { id:'6', emoji:'🪑', title:'IKEA Poäng Armchair', price:180, category:'Furniture', condition:'Good', seller:'Rania T.', sellerColor:'#6A7A4A', desc:'Classic Poäng in birch veneer with beige cushion. Very comfortable. Selling due to move.', location:'Al Wakrah' },
  '7': { id:'7', emoji:'👟', title:'Nike Air Max 270 White', price:220, category:'Sports', condition:'Good', seller:'Omar F.', sellerColor:'#5A4A7A', desc:'Worn 5-6 times. Clean white colourway. No sole wear. Comes in original box.', location:'Madinat Khalifa' },
  '8': { id:'8', emoji:'🧩', title:'LEGO City Police Bundle', price:160, category:'Kids', condition:'Good', seller:'Dana M.', sellerColor:'#7A6A4A', desc:'3 LEGO City sets. All complete with manuals. Great condition. Smoke-free home.', location:'Al Khor' },
}

export default function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [user, setUser] = useState<any>(null)
  const product = demoProducts[id]

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [])

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
    window.location.href = `/checkout?product=${product.id}&amount=${product.price}&title=${encodeURIComponent(product.title)}&seller=${encodeURIComponent(product.seller)}`
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <button onClick={() => window.location.href='/'} style={{fontSize:'13px', color:'#7A7068', background:'none', border:'none', cursor:'pointer'}}>← Back to listings</button>
      </nav>
      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'40px 8%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px'}}>
        <div>
          <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'120px', marginBottom:'12px'}}>
            {product.emoji}
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
          <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'24px', paddingBottom:'24px', borderBottom:'1px solid #D9CEBC'}}>{product.desc}</p>
          <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'14px', background:'white', borderRadius:'4px', marginBottom:'24px'}}>
            <div style={{width:'40px', height:'40px', borderRadius:'50%', background:product.sellerColor, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'16px', fontWeight:'600'}}>{product.seller[0]}</div>
            <div>
              <div style={{fontSize:'14px', fontWeight:'500'}}>{product.seller}</div>
              <div style={{fontSize:'11px', color:'#7A7068'}}>Active seller · Doha, Qatar</div>
            </div>
            <div style={{marginLeft:'auto', fontSize:'13px', color:'#2D5A3D', fontWeight:'600'}}>⭐ 4.9</div>
          </div>
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