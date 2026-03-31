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
  const [products, setProducts] = useState(demoProducts)
  const [category, setCategory] = useState('All')

  const categories = ['All', 'Fashion', 'Furniture', 'Kids', 'Sports']

  const filtered = category === 'All' ? products : products.filter(p => p.category === category)

  return (
    <main style={{fontFamily: 'Georgia, serif', background: '#F5F0E8', minHeight: '100vh'}}>
      
      {/* NAV */}
      <nav style={{background: 'rgba(245,240,232,0.95)', borderBottom: '1px solid #D9CEBC', padding: '0 5%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100}}>
        <div style={{fontSize: '22px', color: '#2D5A3D', fontWeight: '600'}}>🌿 Renew Store</div>
        <div style={{display: 'flex', gap: '16px'}}>
          <button style={{background: 'none', border: '1.5px solid #2D5A3D', color: '#2D5A3D', padding: '8px 18px', cursor: 'pointer', borderRadius: '2px', fontSize: '13px'}}>Log in</button>
          <button style={{background: '#2D5A3D', border: 'none', color: 'white', padding: '8px 18px', cursor: 'pointer', borderRadius: '2px', fontSize: '13px'}}>Sign up</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{paddingTop: '68px', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '120px 8% 80px'}}>
        <div>
          <p style={{fontSize: '11px', color: '#3D7A54', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '20px'}}>Qatar's Premium Marketplace</p>
          <h1 style={{fontSize: '72px', fontWeight: '300', lineHeight: '1.06', color: '#1E1E1E', marginBottom: '24px'}}>Give things<br/>a <em style={{color: '#2D5A3D'}}>second</em><br/>life.</h1>
          <p style={{fontSize: '16px', color: '#7A7068', maxWidth: '400px', lineHeight: '1.8', marginBottom: '40px', fontFamily: 'sans-serif'}}>Buy and sell pre-loved fashion, furniture, kids' items and more — locally, in Qatar.</p>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <button style={{background: '#2D5A3D', color: 'white', border: 'none', padding: '15px 36px', fontSize: '13px', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase'}}>Start browsing</button>
            <button style={{background: 'none', border: 'none', color: '#7A7068', fontSize: '13px', cursor: 'pointer'}}>Become a seller →</button>
          </div>
          <div style={{display: 'flex', gap: '40px', marginTop: '52px', paddingTop: '36px', borderTop: '1px solid #D9CEBC'}}>
            <div><div style={{fontSize: '30px', color: '#2D5A3D'}}>2,400+</div><div style={{fontSize: '11px', color: '#7A7068', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '5px'}}>Active listings</div></div>
            <div><div style={{fontSize: '30px', color: '#2D5A3D'}}>840+</div><div style={{fontSize: '11px', color: '#7A7068', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '5px'}}>Sellers</div></div>
            <div><div style={{fontSize: '30px', color: '#2D5A3D'}}>Doha</div><div style={{fontSize: '11px', color: '#7A7068', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '5px'}}>Based in Qatar</div></div>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section style={{padding: '80px 8%', background: 'white'}}>
        <p style={{fontSize: '11px', color: '#3D7A54', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px'}}>Just listed</p>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px'}}>
          <h2 style={{fontSize: '44px', fontWeight: '300', lineHeight: '1.15'}}>Fresh <em style={{color: '#2D5A3D'}}>finds</em><br/>this week</h2>
          <div style={{display: 'flex', gap: '8px'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{padding: '7px 16px', border: '1.5px solid', borderColor: category === cat ? '#2D5A3D' : '#D9CEBC', background: category === cat ? '#2D5A3D' : 'white', color: category === cat ? 'white' : '#7A7068', borderRadius: '50px', fontSize: '12px', cursor: 'pointer'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px'}}>
          {filtered.map(p => (
            <div key={p.id} style={{background: '#F5F0E8', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s'}}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{height: '200px', background: '#EDE6D6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px'}}>
                {p.emoji}
              </div>
              <div style={{padding: '14px 16px'}}>
                <div style={{fontSize: '11px', color: '#7A7068', marginBottom: '4px'}}>{p.seller}</div>
                <div style={{fontSize: '17px', fontWeight: '400', marginBottom: '8px', lineHeight: '1.3'}}>{p.title}</div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span style={{fontSize: '16px', fontWeight: '500', color: '#2D5A3D'}}>QAR {p.price.toLocaleString()}</span>
                  <span style={{fontSize: '10px', background: '#EBF2EC', color: '#2D5A3D', padding: '3px 8px', borderRadius: '2px', fontWeight: '500'}}>{p.condition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}