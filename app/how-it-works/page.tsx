'use client'
export default function HowItWorks() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>

      <div style={{background:'#2D5A3D', padding:'60px 5% 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <p style={{fontSize:'11px', color:'rgba(255,255,255,0.7)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px'}}>How it works</p>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'clamp(32px, 5vw, 48px)', fontWeight:'300', color:'white', lineHeight:'1.1'}}>Simple, safe, and local.</h1>
        </div>
      </div>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'60px 5%'}}>
        
        {/* FOR BUYERS */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'32px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'40px', marginBottom:'12px'}}>🛒</div>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', marginBottom:'24px'}}>For Buyers</h2>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>1</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Browse & find what you love</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>Explore pre-loved items from sellers across Qatar. Use search and filters to find exactly what you're looking for.</p>
          </div>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>2</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Buy securely with MyFatoorah</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>Pay safely through MyFatoorah. Your payment is held securely until you confirm you received the item.</p>
          </div>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>3</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Chat & arrange pickup</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>After payment, chat opens automatically with the seller. Agree on a time and place to meet.</p>
          </div>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>4</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Confirm & leave a review</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>Once you receive the item, confirm it in "My Orders". You have 24 hours to report any issues. Then leave a review for the seller!</p>
          </div>

          <div style={{background:'#EBF2EC', padding:'16px', borderRadius:'4px', marginTop:'28px'}}>
            <p style={{fontSize:'13px', color:'#2D5A3D', fontWeight:'500', marginBottom:'4px'}}>🔒 Buyer Protection</p>
            <p style={{fontSize:'12px', color:'#4A4A4A', lineHeight:'1.7'}}>Your money is held safely until you confirm receipt. If anything is wrong, open a dispute within 24 hours and we'll help.</p>
          </div>
        </div>

        {/* FOR SELLERS */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'32px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'40px', marginBottom:'12px'}}>💰</div>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', marginBottom:'24px'}}>For Sellers</h2>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>1</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>List your item — free</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>Add photos, description, and price. Listings are free and go live after a quick review within 24 hours.</p>
          </div>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>2</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Add your payout details</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>Go to Profile and add your Fawran number or bank IBAN. This is where we'll send your earnings.</p>
          </div>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>3</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Get paid when it sells</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>When someone buys your item, we'll notify you. Chat with the buyer, arrange pickup, and hand over the item.</p>
          </div>

          <div style={{marginBottom:'28px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
              <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#2D5A3D', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:'600'}}>4</div>
              <h3 style={{fontSize:'17px', fontWeight:'500'}}>Receive your earnings</h3>
            </div>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8', marginLeft:'40px'}}>Once the buyer confirms receipt (within 24h), you receive 80% of the sale price. We keep 20% as a service fee.</p>
          </div>

          <div style={{background:'#EBF2EC', padding:'16px', borderRadius:'4px', marginTop:'28px'}}>
            <p style={{fontSize:'13px', color:'#2D5A3D', fontWeight:'500', marginBottom:'4px'}}>💚 Example calculation</p>
            <p style={{fontSize:'12px', color:'#4A4A4A', lineHeight:'1.7'}}>If you sell an item for QAR 100, you receive QAR 80. The QAR 20 service fee covers platform, payment processing, and buyer protection.</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{background:'#2D5A3D', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', color:'white', marginBottom:'12px'}}>Ready to start?</h2>
          <p style={{fontSize:'14px', color:'rgba(255,255,255,0.8)', marginBottom:'24px'}}>Join Qatar's growing community of conscious buyers and sellers.</p>
          <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
            <button onClick={() => window.location.href='/signup'} style={{background:'white', color:'#2D5A3D', border:'none', padding:'14px 28px', fontSize:'13px', cursor:'pointer', borderRadius:'2px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.05em'}}>Create account</button>
            <button onClick={() => window.location.href='/'} style={{background:'transparent', color:'white', border:'1.5px solid rgba(255,255,255,0.4)', padding:'14px 28px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>Browse items</button>
          </div>
        </div>

      </div>
    </main>
  )
}