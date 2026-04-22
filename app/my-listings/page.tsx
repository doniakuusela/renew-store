'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    active: { bg: '#EBF2EC', color: '#2D5A3D', text: '✅ Active' },
    pending: { bg: '#FEF3C7', color: '#D97706', text: '⏳ Pending approval' },
    sold: { bg: '#F5F0E8', color: '#7A7068', text: '💰 Sold' },
    paused: { bg: '#F5F0E8', color: '#7A7068', text: '⏸️ Paused' },
  }
  const s = styles[status] || { bg: '#F5F0E8', color: '#7A7068', text: status }
  return <span style={{background:s.bg, color:s.color, padding:'4px 10px', borderRadius:'2px', fontSize:'11px', fontWeight:'600'}}>{s.text}</span>
}

export default function MyListings() {
  const [user, setUser] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        window.location.href = '/auth'
        return
      }
      setUser(session.user)
      await loadListings(session.user.id)
      setLoading(false)
    })
  }, [])

  async function loadListings(userId: string) {
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setListings(data)
  }

  function startEdit(listing: any) {
    setEditing(listing.id)
    setEditTitle(listing.title)
    setEditPrice(listing.price.toString())
    setEditDescription(listing.description || '')
  }

  async function saveEdit(id: string) {
    await supabase.from('listings').update({
      title: editTitle,
      price: parseFloat(editPrice),
      description: editDescription,
      status: 'pending'
    }).eq('id', id)

    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'renewstoreqa@gmail.com',
        subject: '📝 Listing edited — needs approval',
        message: `A seller edited their listing "${editTitle}". Please review it in the admin panel.`,
        type: 'order_confirmed'
      })
    })
    
    setEditing(null)
    await loadListings(user.id)
  }

  async function deleteListing(id: string) {
    const ok = window.confirm('Are you sure you want to delete this listing?')
    if (!ok) return
    await supabase.from('listings').delete().eq('id', id)
    await loadListings(user.id)
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    await supabase.from('listings').update({ status: newStatus }).eq('id', id)
    await loadListings(user.id)
  }

  if (loading) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'sans-serif'}}>Loading...</div>

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>

      <div style={{maxWidth:'760px', margin:'0 auto', padding:'48px 8%'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
          <div>
            <h1 style={{fontFamily:'Georgia, serif', fontSize:'36px', fontWeight:'300', marginBottom:'4px'}}>My Listings</h1>
            <p style={{fontSize:'13px', color:'#7A7068'}}>{listings.length} listing{listings.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => window.location.href='/sell'} style={{background:'#2D5A3D', color:'white', border:'none', padding:'12px 24px', fontSize:'13px', cursor:'pointer', borderRadius:'2px', fontWeight:'500'}}>+ Add new listing</button>
        </div>

        {listings.length === 0 ? (
          <div style={{background:'white', padding:'60px 20px', borderRadius:'4px', textAlign:'center'}}>
            <div style={{fontSize:'48px', marginBottom:'12px'}}>📦</div>
            <h3 style={{fontFamily:'Georgia, serif', fontSize:'22px', fontWeight:'300', marginBottom:'8px'}}>No listings yet</h3>
            <p style={{fontSize:'14px', color:'#7A7068', marginBottom:'20px'}}>Add your first item to start selling</p>
            <button onClick={() => window.location.href='/sell'} style={{background:'#2D5A3D', color:'white', border:'none', padding:'12px 24px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>Add listing</button>
          </div>
        ) : (
          listings.map(listing => (
            <div key={listing.id} style={{background:'white', borderRadius:'4px', padding:'20px', marginBottom:'14px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              {editing === listing.id ? (
                <div>
                  <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Title</label>
                  <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'10px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px', marginBottom:'12px'}}/>
                  
                  <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Price (QAR)</label>
                  <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'10px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px', marginBottom:'12px'}}/>
                  
                  <label style={{display:'block', fontSize:'11px', fontWeight:'600', textTransform:'uppercase', color:'#7A7068', marginBottom:'6px'}}>Description</label>
                  <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} style={{width:'100%', border:'1.5px solid #D9CEBC', padding:'10px', fontSize:'14px', outline:'none', boxSizing:'border-box', borderRadius:'2px', minHeight:'80px', resize:'vertical', fontFamily:'sans-serif', marginBottom:'14px'}}/>
                  
                  <p style={{fontSize:'11px', color:'#D97706', marginBottom:'12px'}}>⚠️ Edits require admin re-approval before going live.</p>
                  
                  <div style={{display:'flex', gap:'10px'}}>
                    <button onClick={() => saveEdit(listing.id)} style={{background:'#2D5A3D', color:'white', border:'none', padding:'10px 18px', fontSize:'13px', fontWeight:'500', cursor:'pointer', borderRadius:'2px'}}>Save</button>
                    <button onClick={() => setEditing(null)} style={{background:'none', border:'1.5px solid #D9CEBC', color:'#7A7068', padding:'10px 18px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{display:'flex', gap:'14px', alignItems:'flex-start', marginBottom:'14px', flexWrap:'wrap'}}>
                    {listing.image_url && (
                      <img src={listing.image_url} alt={listing.title} style={{width:'80px', height:'80px', objectFit:'cover', borderRadius:'4px', flexShrink:0}}/>
                    )}
                    <div style={{flex:1, minWidth:'180px'}}>
                      <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap'}}>
                        <div style={{fontSize:'16px', fontWeight:'500'}}>{listing.title}</div>
                        <StatusBadge status={listing.status}/>
                      </div>
                      <div style={{fontSize:'20px', fontWeight:'600', color:'#2D5A3D', marginBottom:'4px'}}>QAR {listing.price}</div>
                      <div style={{fontSize:'12px', color:'#7A7068'}}>{listing.category} · {listing.condition} · {listing.location}</div>
                    </div>
                  </div>
                  
                  <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                    <button onClick={() => startEdit(listing)} style={{background:'none', border:'1.5px solid #D9CEBC', color:'#4A4A4A', padding:'8px 14px', fontSize:'12px', cursor:'pointer', borderRadius:'2px', fontWeight:'500'}}>✏️ Edit</button>
                    {listing.status === 'active' && (
                      <button onClick={() => toggleStatus(listing.id, listing.status)} style={{background:'none', border:'1.5px solid #D9CEBC', color:'#4A4A4A', padding:'8px 14px', fontSize:'12px', cursor:'pointer', borderRadius:'2px', fontWeight:'500'}}>⏸️ Pause</button>
                    )}
                    {listing.status === 'paused' && (
                      <button onClick={() => toggleStatus(listing.id, listing.status)} style={{background:'none', border:'1.5px solid #2D5A3D', color:'#2D5A3D', padding:'8px 14px', fontSize:'12px', cursor:'pointer', borderRadius:'2px', fontWeight:'500'}}>▶️ Activate</button>
                    )}
                    <button onClick={() => deleteListing(listing.id)} style={{background:'none', border:'1.5px solid #DC2626', color:'#DC2626', padding:'8px 14px', fontSize:'12px', cursor:'pointer', borderRadius:'2px', fontWeight:'500'}}>🗑️ Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  )
}