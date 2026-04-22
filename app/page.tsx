'use client'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

const categoryEmojis: any = {
  'Fashion': '👗',
  'Furniture': '🛋️',
  'Kids': '🧸',
  'Sports': '🚴',
  'Electronics': '📱',
  'Other': '📦',
}

export default function Home() {
  const [category, setCategory] = useState('All')
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const categories = ['All', 'Fashion', 'Furniture', 'Kids', 'Sports']
  const filtered = category === 'All' ? products : products.filter(p => p.category === category)

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
    loadProducts()
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function loadProducts() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setProducts(data)
    }
    setLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main style={{fontFamily:'Georgia, serif', background:'#F5F0E8', minHeight:'100vh'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100, backdropFilter:'blur(12px)'}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600'}}>🌿 Renew Store</div>
        
        {!isMobile ? (
          <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
            {user ? (
              <>
                <span style={{fontSize:'13px', color:'#2D5A3D'}}>👋 {user.email?.split('@')[0]}</span>
                <button onClick={() => window.location.href='/sell'} style={{background:'none', border:'none', color:'#7A7068', cursor:'pointer', fontSize:'13px'}}>Sell</button>
                <button onClick={() => window.location.href='/orders'} style={{background:'none', border:'none', color:'#7A7068', cursor:'pointer', fontSize:'13px'}}>Orders</button>
                <button onClick={() => window.location.href='/profile'} style={{background:'none', border:'none', color:'#7A7068', cursor:'pointer', fontSize:'13px'}}>Profile</button>
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

      {isMobile && menuOpen && (
        <div style={{position:'fixed', top:'68px', left:0, right:0, background:'white', zIndex:99, padding:'20px 5%', borderBottom:'1px solid #D9CEBC', display:'flex', flexDirection:'column', gap:'12px'}}>
          {user ? (
            <>
              <span style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'500'}}>👋 {user.email?.split('@')[0]}</span>
              <button onClick={() => {window.location.href='/sell'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>➕ Sell an item</button>
              <button onClick={() => {window.location.href='/orders'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>📦 My Orders</button>
              <button onClick={() => {window.location.href='/profile'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>👤 My Profile</button>
              <button onClick={() => {window.location.href='/chat'; setMenuOpen(false)}} style={{background:'none', border:'1.5px solid #D9CEBC', padding:'12px', cursor:'pointer', borderRadius:'2px', fontSize:'14px', textAlign:'left'}}>💬 Messages</button>
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

      <section style={{paddingTop:'68px', minHeight:'70vh', display:'flex', alignItems:'center', padding: isMobile ? '80px 5% 48px' : '80px 8%'}}>
        <div>
          <p style={{fontSize:'11px', color:'#3D7A54', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:'20px'}}>Qatar's Premium Marketplace</p>
          <h1 style={{fontSize: isMobile ? '40px' : '72px', fontWeight:'300', lineHeight:'1.06', color:'#1E1E1E', marginBottom:'24px'}}>Give things<br/>a <em style={{color:'#2D5A3D'}}>second</em><br/>life.</h1>
          <p style={{fontSize:'15px', color:'#7A7068', maxWidth:'400px', lineHeight:'1.8', marginBottom:'32px', fontFamily:'sans-serif'}}>Buy and sell pre-loved fashion, furniture, kids items and more — locally, in Qatar.</p>
          <div style={{display:'flex', gap:'16px', alignItems:'center', flexWrap:'wrap'}}>
            <button onClick={() => window.location.href=user?'/sell':'/signup'} style={{background:'#2D5A3D', color:'white', border:'none', padding:'14px 28px', fontSize:'13px', cursor:'pointer', letterSpacing:'0.05em', textTransform:'uppercase'}}>Start selling</button>
            <button onClick={() => window.location.href='#listings'} style={{background:'none', border:'none', color:'#7A7068', fontSize:'13px', cursor:'pointer'}}>Browse items →</button>
          </div>
          <div style={{display:'flex', gap:'24px', marginTop:'40px', paddingTop:'28px', borderTop:'1px solid #D9CEBC', flexWrap:'wrap'}}>
            <div><div style={{fontSize:'24px', color:'#2D5A3D'}}>{products.length}+</div><div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'4px'}}>Active listings</div></div>
            <div><div style={{fontSize:'24px', color:'#2D5A3D'}}>Doha</div><div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'4px'}}>Based in Qatar</div></div>
          </div>
        </div>
      </section>

      <section id="listings" style={{padding: isMobile ? '40px 5%' : '60px 8%', background:'white'}}>
        <p style={{fontSize:'11px', color:'#3D7A54', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'8px'}}>Browse items</p>
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
          <h2 style={{fontSize: isMobile ? '28px' : '44px', fontWeight:'300', lineHeight:'1.15'}}>Fresh <em style={{color:'#2D5A3D'}}>finds</em></h2>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{padding:'6px 12px', border:'1.5px solid', borderColor: category === cat ? '#2D5A3D' : '#D9CEBC', background: category === cat ? '#2D5A3D' : 'white', color: category === cat ? 'white' : '#7A7068', borderRadius:'50px', fontSize:'12px', cursor:'pointer'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <p style={{textAlign:'center', padding:'40px', color:'#7A7068'}}>Loading items...</p>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px 20px', background:'#F5F0E8', borderRadius:'4px'}}>
            <div style={{fontSize:'48px', marginBottom:'12px'}}>📦</div>
            <h3 style={{fontFamily:'Georgia, serif', fontSize:'22px', fontWeight:'300', marginBottom:'8px'}}>No items yet</h3>
            <p style={{fontSize:'14px', color:'#7A7068', marginBottom:'20px'}}>Be the first to list something!</p>
            <button onClick={() => window.location.href=user?'/sell':'/signup'} style={{background:'#2D5A3D', color:'white', border:'none', padding:'12px 24px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>Start selling</button>
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '12px' : '20px'}}>
            {filtered.map(p => (
              <div key={p.id} onClick={() => window.location.href=`/product/${p.id}`} style={{background:'#F5F0E8', borderRadius:'4px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s'}}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                <div style={{width:'100%', aspectRatio:'1', background:'#EDE6D6', display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? '44px' : '56px', overflow:'hidden'}}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                  ) : (
                    <span>{categoryEmojis[p.category] || '📦'}</span>
                  )}
                </div>
                <div style={{padding: isMobile ? '10px 12px' : '12px 14px'}}>
                  <div style={{fontSize:'11px', color:'#7A7068', marginBottom:'3px'}}>{p.location}</div>
                  <div style={{fontSize: isMobile ? '13px' : '15px', fontWeight:'400', marginBottom:'6px', lineHeight:'1.3'}}>{p.title}</div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span style={{fontSize: isMobile ? '13px' : '15px', fontWeight:'500', color:'#2D5A3D'}}>QAR {p.price.toLocaleString()}</span>
                    <span style={{fontSize:'10px', background:'#EBF2EC', color:'#2D5A3D', padding:'2px 6px', borderRadius:'2px', fontWeight:'500'}}>{p.condition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}