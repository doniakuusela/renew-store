'use client'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

const demoProducts = [
  { id:1, emoji:'👗', title:'Massimo Dutti Silk Blouse', price:120, category:'Fashion', condition:'Like new', seller:'Sara A.' },
  { id:2, emoji:'🛋️', title:'Vintage Arc Floor Lamp', price:350, category:'Furniture', condition:'Good', seller:'Ahmed K.' },
  { id:3, emoji:'🧸', title:'Stokke Tripp Trapp High Chair', price:480, category:'Kids', condition:'Like new', seller:'Mona R.' },
  { id:4, emoji:'🚴', title:'Trek Road Bike Aluminum', price:1800, category:'Sports', condition:'Good', seller:'James L.' },
  { id:5, emoji:'👜', title:'Zara Structured Tote Bag', price:95, category:'Fashion', condition:'Like new', seller:'Layla Q.' },
  { id:6, emoji:'🪑', title:'IKEA Poäng Armchair', price:180, category:'Furniture', condition:'Good', seller:'Rania T.' },
  { id:7, emoji:'👟', title:'Nike Air Max 270', price:220, category:'Sports', condition:'Good', seller:'Omar F.' },
  { id:8, emoji:'🧩', title:'LEGO City Police Bundle', price:160, category:'Kids', condition:'Good', seller:'Dana M.' },
]

export default function Home() {
  const [category, setCategory] = useState('All')
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const categories = ['All', 'Fashion', 'Furniture', 'Kids', 'Sports']
  const filtered = category === 'All' ? demoProducts : demoProducts.filter(p => p.category === category)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main style={{fontFamily:'Georgia, serif', background:'#F5F0E8', minHeight:'100vh'}}>
      
      {/* NAV */}
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100, backdropFilter:'blur(12px)'}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600'}}>🌿 Renew Store</div>
        
        {!isMobile ? (
          <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
            {user ? (
              <>
                <span style={{fontSize:'13px', color:'#2D5A3D'}}>👋 {user.email?.split('@')[0]}</span>
                <button onClick={() => window.location.href='/orders'} style={{background:'none', border:'none', color:'#7A7068', cursor:'pointer', fontSize:'13px'}}>Orders</button>
                <button onClick={() => window.location.href='/chat'} style={{background:'none', border:'1.5px solid #2D5A3D', color:'#2D5A3D', padding:'8px 18px', cursor:'pointer', borderRadius:'2px', fontSize:'13px'}}>Messages</button>
                <button onClick={handleSignOut} style={{background:'#2D5A3D', border:'none', color:'white', padding:'8px 18px', cursor:'pointer', borderRadius:'2px', fontSize:'13px'}}>Sign out</button>
              </>
            ) : (
              <>
                <button onClick={() => window.location.href='/auth'} style={{background:'none', border:'1.5px solid #2D5A3D', color:'#2D5A3D', padding:'8px 18px', cursor:'pointer', borderRadius:'2px', fontSize:'13px'}}>Log in</button>
                <button onClick={() => window.location.href='/signup'} style={{background:'#2D5A3D', border:'none', color:'white', padding:'8px 18px', cursor:'pointer', borderRadius:'2px', fontSize:'13px'}}>Sign up</button>
              </>
            )}
          </div>
        ) : (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{background:'none', border:'none', cursor:'pointer', fontSize:'28px', color:'#2D5A3D', lineHeight:1}}>
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <div style={{position:'fixed', top:'68px', left:0, right:0, background:'white', zIndex:99, padding:'20px 5%', borderBottom:'1px solid #D9CEBC', display:'flex', flexDirection:'column', gap:'12px'}}>
          {user ? (
            <>
              <span style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'500'}}>👋 {user.email?.split('@')[0]}</span>
              <button onClick={() => {window.location.href='/orders'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>📦 My Orders</button>
              <button onClick={() => {window.location.href='/chat'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>💬 Messages</button>
              <button onClick={() => {window.location.href='/sell'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>➕ Sell an item</button>
              <button onClick={handleSignOut} style={{background:'#2D5A3D', border:'none', color:'white', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px'}}>Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => {window.location.href='/auth'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #2D5A3D', color:'#2D5A3D', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px'}}>Log in</button>
              <button onClick={() => {window.location.href='/signup'; setMenuOpen(false)}} style={{background:'#2D5A3D', border:'none', color:'white', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px'}}>Sign up</button>
            </>
          )}
        </div>
      )}

      {/* HERO */}
      <section style={{paddingTop:'68px', minHeight:'70vh', display:'flex', alignItems:'center', padding:isMobile ? '80px 5% 48px' : '80px 8%'}}>
        <div>
          <p style={{fontSize:'11px', color:'#3D7A54', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:'20px'}}>Qatar's Premium Marketplace</p>
          <h1 style={{fontSize: isMobile ? '40px' : '72px', fontWeight:'300', lineHeight:'1.06', color:'#1E1E1E', marginBottom:'24px'}}>Give things<br/>a <em style={{color:'#2D5A3D'}}>second</em><br/>life.</h1>
          <p style={{fontSize:'15px', color:'#7A7068', maxWidth:'400px', lineHeight:'1.8', marginBottom:'32px', fontFamily:'sans-serif'}}>Buy and sell pre-loved fashion, furniture, kids items and more — locally, in Qatar.</p>
          <div style={{display:'flex', gap:'16px', alignItems:'center', flexWrap:'wrap'}}>
            <button onClick={() => window.location.href=user?'/sell':'/auth'} style={{background:'#2D5A3D', color:'white', border:'none', padding:'14px 28px', fontSize:'13px', cursor:'pointer', letterSpacing:'0.05em', textTransform:'uppercase'}}>Start browsing</button>
            <button onClick={() => window.location.href='/sell'} style={{background:'none', border:'none', color:'#7A7068', fontSize:'13px', cursor:'pointer'}}>Become a seller →</button>
          </div>
          <div style={{display:'flex', gap:'24px', marginTop:'40px', paddingTop:'28px', borderTop:'1px solid #D9CEBC', flexWrap:'wrap'}}>
            <div><div style={{fontSize:'24px', color:'#2D5A3D'}}>2,400+</div><div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'4px'}}>Active listings</div></div>
            <div><div style={{fontSize:'24px', color:'#2D5A3D'}}>840+</div><div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'4px'}}>Sellers</div></div>
            <div><div style={{fontSize:'24px', color:'#2D5A3D'}}>Doha</div><div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'4px'}}>Based in Qatar</div></div>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section style={{padding: isMobile ? '40px 5%' : '60px 8%', background:'white'}}>
        <p style={{fontSize:'11px', color:'#3D7A54', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'8px'}}>Just listed</p>
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
          <h2 style={{fontSize: isMobile ? '28px' : '44px', fontWeight:'300', lineHeight:'1.15'}}>Fresh <em style={{color:'#2D5A3D'}}>finds</em><br/>this week</h2>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{padding:'6px 12px', border:'1.5px solid', borderColor: category === cat ? '#2D5A3D' : '#D9CEBC', background: category === cat ? '#2D5A3D' : 'white', color: category === cat ? 'white' : '#7A7068', borderRadius:'50px', fontSize:'12px', cursor:'pointer'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '12px' : '20px'}}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => window.location.href=`/product/${p.id}`} style={{background:'#F5F0E8', borderRadius:'4px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s'}}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? '44px' : '56px'}}>
                {p.emoji}
              </div>
              <div style={{padding: isMobile ? '10px 12px' : '12px 14px'}}>
                <div style={{fontSize:'11px', color:'#7A7068', marginBottom:'3px'}}>{p.seller}</div>
                <div style={{fontSize: isMobile ? '13px' : '15px', fontWeight:'400', marginBottom:'6px', lineHeight:'1.3'}}>{p.title}</div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <span style={{fontSize: isMobile ? '13px' : '15px', fontWeight:'500', color:'#2D5A3D'}}>QAR {p.price.toLocaleString()}</span>
                  <span style={{fontSize:'10px', background:'#EBF2EC', color:'#2D5A3D', padding:'2px 6px', borderRadius:'2px', fontWeight:'500'}}>{p.condition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}