'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = 'renewstoreqa@gmail.com'

const demoStats = {
  totalOrders: 47,
  totalRevenue: 18420,
  serviceFee: 3684,
  activeListings: 124,
  totalUsers: 312,
  disputes: 2,
}

const demoOrders = [
  { id: '001', buyer: 'Fatima A.', seller: 'Sara M.', item: 'Zara Tote Bag', amount: 95, serviceFee: 19, status: 'confirmed', date: '2025-04-15' },
  { id: '002', buyer: 'Khalid R.', seller: 'Ahmed K.', item: 'Arc Floor Lamp', amount: 350, serviceFee: 70, status: 'completed', date: '2025-04-14' },
  { id: '003', buyer: 'Noura S.', seller: 'Mona R.', item: 'Stokke High Chair', amount: 480, serviceFee: 96, status: 'disputed', date: '2025-04-13' },
  { id: '004', buyer: 'Omar F.', seller: 'Layla Q.', item: 'Nike Air Max', amount: 220, serviceFee: 44, status: 'completed', date: '2025-04-12' },
]

const demoListings = [
  { id: '1', title: 'Massimo Dutti Silk Blouse', seller: 'Sara A.', price: 120, status: 'active', date: '2025-04-15' },
  { id: '2', title: 'Vintage Arc Floor Lamp', seller: 'Ahmed K.', price: 350, status: 'active', date: '2025-04-14' },
  { id: '3', title: 'Suspicious Item', seller: 'Unknown', price: 5, status: 'pending', date: '2025-04-15' },
]

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    confirmed: { bg: '#EBF2EC', color: '#2D5A3D', text: '✅ Confirmed' },
    completed: { bg: '#F5F0E8', color: '#7A7068', text: '☑️ Completed' },
    disputed: { bg: '#FEE2E2', color: '#DC2626', text: '⚠️ Disputed' },
    active: { bg: '#EBF2EC', color: '#2D5A3D', text: '✅ Active' },
    pending: { bg: '#FEF3C7', color: '#D97706', text: '⏳ Pending' },
  }
  const s = styles[status] || { bg: '#F5F0E8', color: '#7A7068', text: status }
  return <span style={{background:s.bg, color:s.color, padding:'3px 10px', borderRadius:'2px', fontSize:'11px', fontWeight:'600'}}>{s.text}</span>
}

export default function Admin() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('overview')
  const [listings, setListings] = useState(demoListings)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== ADMIN_EMAIL) {
        window.location.href = '/'
        return
      }
      setUser(session.user)
      setLoading(false)
    })
  }, [])

  function approveListing(id: string) {
    setListings(prev => prev.map(l => l.id === id ? {...l, status: 'active'} : l))
  }

  function removeListing(id: string) {
    setListings(prev => prev.filter(l => l.id !== id))
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh'}}>
      
      {/* HEADER */}
      <div style={{background:'#2D5A3D', padding:'24px 5%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', color:'white'}}>🌿 Renew Store Admin</h1>
          <p style={{fontSize:'12px', color:'rgba(255,255,255,0.6)', marginTop:'4px'}}>Welcome, {user?.email}</p>
        </div>
        <button onClick={() => window.location.href='/'} style={{background:'rgba(255,255,255,0.15)', border:'none', color:'white', padding:'8px 16px', borderRadius:'2px', cursor:'pointer', fontSize:'13px'}}>← Back to site</button>
      </div>

      {/* TABS */}
      <div style={{background:'white', borderBottom:'1px solid #D9CEBC', padding:'0 5%', display:'flex', gap:'0'}}>
        {['overview', 'orders', 'listings', 'disputes'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{padding:'16px 20px', background:'none', border:'none', borderBottom: tab === t ? '2px solid #2D5A3D' : '2px solid transparent', color: tab === t ? '#2D5A3D' : '#7A7068', cursor:'pointer', fontSize:'13px', fontWeight: tab === t ? '600' : '400', textTransform:'capitalize', fontFamily:'sans-serif'}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{padding:'32px 5%'}}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'16px', marginBottom:'32px'}}>
              {[
                { label: 'Total Orders', value: demoStats.totalOrders, color: '#2D5A3D' },
                { label: 'Total Revenue', value: `QAR ${demoStats.totalRevenue.toLocaleString()}`, color: '#2D5A3D' },
                { label: 'Your service fee (20%)', value: `QAR ${demoStats.serviceFee.toLocaleString()}`, color: '#2D5A3D' },
                { label: 'Active Listings', value: demoStats.activeListings, color: '#2D5A3D' },
                { label: 'Total Users', value: demoStats.totalUsers, color: '#2D5A3D' },
                { label: 'Open Disputes', value: demoStats.disputes, color: '#DC2626' },
              ].map(stat => (
                <div key={stat.label} style={{background:'white', padding:'20px', borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                  <div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px'}}>{stat.label}</div>
                  <div style={{fontSize:'24px', fontWeight:'700', color:stat.color}}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>All Orders</h2>
            <div style={{background:'white', borderRadius:'4px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'1px solid #D9CEBC'}}>
                    {['Order', 'Buyer', 'Seller', 'Item', 'Amount', 'service fee', 'Status', 'Date'].map(h => (
                      <th key={h} style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', color:'#7A7068'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {demoOrders.map(order => (
                    <tr key={order.id} style={{borderBottom:'1px solid #F5F0E8'}}>
                      <td style={{padding:'12px 16px', fontSize:'13px', fontWeight:'600', color:'#2D5A3D'}}>#{order.id}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px'}}>{order.buyer}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px'}}>{order.seller}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px'}}>{order.item}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px', fontWeight:'500'}}>QAR {order.amount}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px', color:'#2D5A3D', fontWeight:'500'}}>QAR {order.serviceFee}</td>
                      <td style={{padding:'12px 16px'}}><StatusBadge status={order.status}/></td>
                      <td style={{padding:'12px 16px', fontSize:'12px', color:'#7A7068'}}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LISTINGS */}
        {tab === 'listings' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Manage Listings</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              {listings.map(listing => (
                <div key={listing.id} style={{background:'white', padding:'18px 20px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'14px', fontWeight:'500', marginBottom:'3px'}}>{listing.title}</div>
                    <div style={{fontSize:'12px', color:'#7A7068'}}>Seller: {listing.seller} · QAR {listing.price} · {listing.date}</div>
                  </div>
                  <StatusBadge status={listing.status}/>
                  {listing.status === 'pending' && (
                    <button onClick={() => approveListing(listing.id)} style={{background:'#2D5A3D', color:'white', border:'none', padding:'8px 14px', borderRadius:'2px', cursor:'pointer', fontSize:'12px', fontWeight:'500'}}>
                      ✅ Approve
                    </button>
                  )}
                  <button onClick={() => removeListing(listing.id)} style={{background:'none', color:'#DC2626', border:'1.5px solid #DC2626', padding:'8px 14px', borderRadius:'2px', cursor:'pointer', fontSize:'12px', fontWeight:'500'}}>
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISPUTES */}
        {tab === 'disputes' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Open Disputes</h2>
            <div style={{background:'white', padding:'24px', borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <div style={{background:'#FEE2E2', padding:'20px', borderRadius:'4px', marginBottom:'16px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px'}}>
                  <div>
                    <div style={{fontSize:'14px', fontWeight:'600', color:'#DC2626'}}>⚠️ Dispute #003</div>
                    <div style={{fontSize:'12px', color:'#7A7068', marginTop:'3px'}}>Stokke High Chair · Noura S. vs Mona R. · QAR 480</div>
                  </div>
                  <span style={{fontSize:'11px', color:'#7A7068'}}>2025-04-13</span>
                </div>
                <p style={{fontSize:'13px', color:'#4A4A4A', lineHeight:'1.7', marginBottom:'14px'}}>Buyer claims item was not as described. Requesting full refund.</p>
                <div style={{display:'flex', gap:'10px'}}>
                  <button style={{background:'#2D5A3D', color:'white', border:'none', padding:'10px 16px', borderRadius:'2px', cursor:'pointer', fontSize:'12px', fontWeight:'500'}}>✅ Refund buyer</button>
                  <button style={{background:'none', border:'1.5px solid #2D5A3D', color:'#2D5A3D', padding:'10px 16px', borderRadius:'2px', cursor:'pointer', fontSize:'12px', fontWeight:'500'}}>💰 Release to seller</button>
                  <button style={{background:'none', border:'1.5px solid #D9CEBC', color:'#7A7068', padding:'10px 16px', borderRadius:'2px', cursor:'pointer', fontSize:'12px'}}>💬 View chat</button>
                </div>
              </div>
              <p style={{fontSize:'13px', color:'#7A7068', textAlign:'center'}}>No other open disputes</p>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}