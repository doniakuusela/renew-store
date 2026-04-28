'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = 'renewstoreqa@gmail.com'

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
  const [orders, setOrders] = useState<any[]>([])
  const [listings, setListings] = useState<any[]>([])
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth?redirect=/admin'
        return
      }
      if (!session) {
        window.location.href = '/auth?redirect=/admin'
        return
      }
      if (session.user.email !== ADMIN_EMAIL) {
        window.location.href = '/'
        return
      }
      setUser(session.user)
      await loadData()
      setLoading(false)
    })
  }, [])

  async function loadData() {
    // Load orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (ordersData) setOrders(ordersData)

    // Load listings
    const { data: listingsData } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
    if (listingsData) setListings(listingsData)

    // Load profiles for payout info
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
    if (profilesData) setProfiles(profilesData)
  }

  async function approveListing(id: string) {
    const listing = listings.find(l => l.id === id)
    await supabase.from('listings').update({ status: 'active' }).eq('id', id)
    
    // Find seller profile
    if (listing) {
      const { data: sellerProfile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', listing.user_id)
        .single()
      
      if (sellerProfile?.email) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: sellerProfile.email,
            subject: '🎉 Your listing is live — Renew Store',
            message: `Great news! Your listing "${listing.title}" has been approved and is now live on Renew Store. Buyers can now see and purchase it!`,
            type: 'new_message'
          })
        })
      }
    }
    
    loadData()
  }

  async function removeListing(id: string) {
    await supabase.from('listings').delete().eq('id', id)
    loadData()
  }

  function getTimeStatus(order: any) {
    if (!order.received_at) {
      return { ready: false, text: '⏳ Waiting for buyer to confirm receipt', color: '#7A7068' }
    }
    const receivedTime = new Date(order.received_at).getTime()
    const now = Date.now()
    const diff = now - receivedTime
    const hours24 = 24 * 60 * 60 * 1000
    
    if (diff >= hours24) {
      return { ready: true, text: '✅ 24h passed — ready to release', color: '#2D5A3D' }
    } else {
      const hoursLeft = Math.floor((hours24 - diff) / 3600000)
      const minsLeft = Math.floor(((hours24 - diff) % 3600000) / 60000)
      return { ready: false, text: `⏱️ ${hoursLeft}h ${minsLeft}m remaining`, color: '#D97706' }
    }
  }

  // Calculate stats
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'confirmed')
  const totalRevenue = completedOrders.reduce((sum, o) => sum + parseFloat(o.amount || 0), 0)
  const totalServiceFee = totalRevenue * 0.2
  const totalPayouts = totalRevenue * 0.8
  const activeListings = listings.filter(l => l.status === 'active').length
  const pendingListings = listings.filter(l => l.status === 'pending').length
  const disputedOrders = orders.filter(o => o.status === 'disputed').length

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh'}}>
      <div style={{background:'#2D5A3D', padding:'24px 5%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', color:'white'}}>🌿 Renew Store Admin</h1>
          <p style={{fontSize:'12px', color:'rgba(255,255,255,0.6)', marginTop:'4px'}}>Welcome, {user?.email}</p>
        </div>
        <button onClick={() => window.location.href='/'} style={{background:'rgba(255,255,255,0.15)', border:'none', color:'white', padding:'8px 16px', borderRadius:'2px', cursor:'pointer', fontSize:'13px'}}>← Back to site</button>
      </div>

      <div style={{background:'white', borderBottom:'1px solid #D9CEBC', padding:'0 5%', display:'flex', gap:'0', overflowX:'auto'}}>
        {['overview', 'orders', 'listings', 'payouts', 'disputes'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{padding:'16px 20px', background:'none', border:'none', borderBottom: tab === t ? '2px solid #2D5A3D' : '2px solid transparent', color: tab === t ? '#2D5A3D' : '#7A7068', cursor:'pointer', fontSize:'13px', fontWeight: tab === t ? '600' : '400', textTransform:'capitalize', fontFamily:'sans-serif', whiteSpace:'nowrap'}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{padding:'32px 5%'}}>

        {tab === 'overview' && (
          <div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'16px', marginBottom:'32px'}}>
              {[
                { label: 'Total Orders', value: orders.length, color: '#2D5A3D' },
                { label: 'Total Revenue', value: `QAR ${totalRevenue.toFixed(0)}`, color: '#2D5A3D' },
                { label: 'Your Service Fee (20%)', value: `QAR ${totalServiceFee.toFixed(0)}`, color: '#2D5A3D' },
                { label: 'To Payout to Sellers', value: `QAR ${totalPayouts.toFixed(0)}`, color: '#D97706' },
                { label: 'Active Listings', value: activeListings, color: '#2D5A3D' },
                { label: 'Pending Approval', value: pendingListings, color: '#D97706' },
                { label: 'Open Disputes', value: disputedOrders, color: '#DC2626' },
              ].map(stat => (
                <div key={stat.label} style={{background:'white', padding:'20px', borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                  <div style={{fontSize:'11px', color:'#7A7068', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px'}}>{stat.label}</div>
                  <div style={{fontSize:'24px', fontWeight:'700', color:stat.color}}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>All Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <div style={{background:'white', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
                <p style={{fontSize:'14px', color:'#7A7068'}}>No orders yet</p>
              </div>
            ) : (
              <div style={{background:'white', borderRadius:'4px', overflow:'auto', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <table style={{width:'100%', borderCollapse:'collapse', minWidth:'800px'}}>
                  <thead>
                    <tr style={{borderBottom:'1px solid #D9CEBC'}}>
                      {['Product', 'Buyer', 'Seller', 'Amount', 'Service fee', 'Payout', 'Status', 'Date'].map(h => (
                        <th key={h} style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.08em', color:'#7A7068'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      const amount = parseFloat(order.amount || 0)
                      const fee = amount * 0.2
                      const payout = amount * 0.8
                      return (
                        <tr key={order.id} style={{borderBottom:'1px solid #F5F0E8'}}>
                          <td style={{padding:'12px 16px', fontSize:'13px'}}>{order.product_title}</td>
                          <td style={{padding:'12px 16px', fontSize:'12px', color:'#7A7068'}}>{order.buyer_email?.split('@')[0]}</td>
                          <td style={{padding:'12px 16px', fontSize:'12px', color:'#7A7068'}}>{order.seller_email?.split('@')[0]}</td>
                          <td style={{padding:'12px 16px', fontSize:'13px', fontWeight:'500'}}>QAR {amount.toFixed(0)}</td>
                          <td style={{padding:'12px 16px', fontSize:'13px', color:'#2D5A3D', fontWeight:'500'}}>QAR {fee.toFixed(0)}</td>
                          <td style={{padding:'12px 16px', fontSize:'13px', color:'#D97706', fontWeight:'500'}}>QAR {payout.toFixed(0)}</td>
                          <td style={{padding:'12px 16px'}}><StatusBadge status={order.status}/></td>
                          <td style={{padding:'12px 16px', fontSize:'11px', color:'#7A7068'}}>{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'listings' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Manage Listings ({listings.length})</h2>
            {listings.length === 0 ? (
              <div style={{background:'white', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
                <p style={{fontSize:'14px', color:'#7A7068'}}>No listings yet</p>
              </div>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {listings.map(listing => (
                  <div key={listing.id} style={{background:'white', padding:'18px 20px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', flexWrap:'wrap'}}>
                    {listing.image_url && <img src={listing.image_url} alt={listing.title} style={{width:'60px', height:'60px', objectFit:'cover', borderRadius:'4px'}}/>}
                    <div style={{flex:1, minWidth:'200px'}}>
                      <div style={{fontSize:'14px', fontWeight:'500', marginBottom:'3px'}}>{listing.title}</div>
                      <div style={{fontSize:'12px', color:'#7A7068'}}>QAR {listing.price} · {listing.category} · {listing.location}</div>
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
            )}
          </div>
        )}

        {tab === 'payouts' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Seller Payouts</h2>
            <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'20px'}}>After 24 hours from order confirmation, release payment to the seller using their preferred method.</p>
            {orders.filter(o => o.status === 'confirmed').length === 0 ? (
              <div style={{background:'white', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
                <p style={{fontSize:'14px', color:'#7A7068'}}>No pending payouts</p>
              </div>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                {orders.filter(o => o.status === 'confirmed').map(order => {
                  const profile = profiles.find(p => p.id === order.seller_email)
                  const amount = parseFloat(order.amount || 0)
                  const payout = amount * 0.8
                  return (
                    <div key={order.id} style={{background:'white', padding:'20px', borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px', flexWrap:'wrap', gap:'12px'}}>
                        <div>
                          <div style={{fontSize:'14px', fontWeight:'600', marginBottom:'4px'}}>{order.product_title}</div>
                          <div style={{fontSize:'12px', color:'#7A7068'}}>Seller: {order.seller_email}</div>
                          <div style={{fontSize:'11px', color:'#7A7068', marginTop:'3px'}}>Ordered: {new Date(order.created_at).toLocaleDateString()}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:'11px', color:'#7A7068'}}>Pay to seller:</div>
                          <div style={{fontSize:'24px', fontWeight:'700', color:'#D97706'}}>QAR {payout.toFixed(0)}</div>
<div style={{marginTop:'6px', fontSize:'12px', fontWeight:'500', color: getTimeStatus(order).color}}>
  {getTimeStatus(order).text}
</div>
                          <div style={{fontSize:'24px', fontWeight:'700', color:'#D97706'}}>QAR {payout.toFixed(0)}</div>
                        </div>
                      </div>
                      <div style={{display:'flex', gap:'10px', marginBottom:'14px'}}>
  <button onClick={async () => {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: order.buyer_email,
        subject: '📦 Don\'t forget to confirm receipt — Renew Store',
        message: `Hi! Just a reminder to confirm you received "${order.product_title}". Please go to My Orders and click "I received the item". If you have any issues with the item, you can open a dispute there too.`,
        type: 'new_message'
      })
    })
    alert('Reminder sent to buyer!')
  }} style={{background:'#2D5A3D', color:'white', border:'none', padding:'8px 16px', borderRadius:'2px', cursor:'pointer', fontSize:'12px', fontWeight:'500'}}>
    📧 Send reminder to buyer
  </button>
</div>
                      {profile && (profile.fawra_number || profile.iban) ? (
                        <div style={{background:'#EBF2EC', padding:'14px', borderRadius:'4px'}}>
                          <div style={{fontSize:'11px', fontWeight:'600', color:'#2D5A3D', marginBottom:'4px', textTransform:'uppercase'}}>Payout details</div>
                          {profile.payout_method === 'fawra' && profile.fawra_number && (
                            <>
                              <div style={{fontSize:'13px', marginBottom:'3px'}}>💰 <strong>Fawran:</strong> {profile.fawra_number}</div>
                              <div style={{fontSize:'12px', color:'#7A7068'}}>Name: {profile.full_name}</div>
                            </>
                          )}
                          {profile.payout_method === 'bank' && profile.iban && (
                            <>
                              <div style={{fontSize:'13px', marginBottom:'3px'}}>🏦 <strong>IBAN:</strong> {profile.iban}</div>
                              <div style={{fontSize:'12px', color:'#7A7068'}}>Account: {profile.account_name}</div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div style={{background:'#FEF3C7', padding:'14px', borderRadius:'4px'}}>
                          <div style={{fontSize:'13px', color:'#D97706'}}>⚠️ Seller has not set up payout information yet</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'disputes' && (
          <div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px'}}>Open Disputes ({disputedOrders})</h2>
            {disputedOrders === 0 ? (
              <div style={{background:'white', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
                <p style={{fontSize:'14px', color:'#7A7068'}}>No open disputes 🎉</p>
              </div>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                {orders.filter(o => o.status === 'disputed').map(order => (
                  <div key={order.id} style={{background:'#FEE2E2', padding:'20px', borderRadius:'4px'}}>
                    <div style={{fontSize:'14px', fontWeight:'600', color:'#DC2626', marginBottom:'6px'}}>⚠️ Dispute: {order.product_title}</div>
                    <div style={{fontSize:'12px', color:'#7A7068'}}>Buyer: {order.buyer_email} · Seller: {order.seller_email} · QAR {order.amount}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  )
}