'use client'
export default function SellerGuide() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div onClick={() => window.location.href='/'} style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>

      <div style={{background:'#2D5A3D', padding:'60px 5% 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <p style={{fontSize:'11px', color:'rgba(255,255,255,0.7)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px'}}>Seller Guide</p>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'clamp(32px, 5vw, 48px)', fontWeight:'300', color:'white', lineHeight:'1.1'}}>Everything you need to start selling.</h1>
          <p style={{fontSize:'15px', color:'rgba(255,255,255,0.8)', marginTop:'16px'}}>Free to list. Simple to sell. Safe for everyone.</p>
        </div>
      </div>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'60px 5%'}}>

        {/* GETTING STARTED */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'26px', fontWeight:'400', marginBottom:'20px', color:'#1E1E1E'}}>🚀 Getting started</h2>
          
          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>1. Create your account</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Sign up with Google or your email. It takes less than a minute. All sellers must be registered to use the platform.</p>
          </div>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>2. Set up your payout method</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Go to <strong>Profile</strong> and add your Fawran number or bank IBAN. This is required before you can receive payments. You can update this anytime.</p>
          </div>

          <div style={{marginBottom:'0'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>3. List your first item</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Click <strong>Sell</strong> in the navigation bar. Fill in the details, add photos, and submit. Your listing will be reviewed and go live within 24 hours.</p>
          </div>
        </div>

        {/* LISTING TIPS */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'26px', fontWeight:'400', marginBottom:'20px', color:'#1E1E1E'}}>📸 How to create a great listing</h2>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Photos</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Add up to 5 photos. Use natural lighting and show the item from multiple angles. Include photos of any defects — honesty builds trust and avoids disputes.</p>
          </div>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Title and description</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Write a clear title with the brand and item name (e.g. "Zara Structured Tote Bag — Camel"). In the description, mention the condition, size if relevant, reason for selling, and any defects.</p>
          </div>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Pricing</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Research similar items before pricing. Remember that Renew Store keeps a 20% service fee — so if you want to receive QAR 80, price the item at QAR 100.</p>
          </div>

          <div style={{marginBottom:'0'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Location</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Choose the area in Qatar where you can meet buyers. Be specific — this helps buyers find items near them.</p>
          </div>
        </div>

        {/* AFTER SALE */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'26px', fontWeight:'400', marginBottom:'20px', color:'#1E1E1E'}}>💬 After someone buys your item</h2>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>You'll receive an email</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>When someone buys your item, you'll get an email notification. Log in and go to <strong>Messages</strong> to chat with the buyer.</p>
          </div>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Arrange pickup</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Use the Renew Store chat to agree on a time and public meeting place in Qatar. We recommend keeping communication on the platform so there is a record in case of any dispute.</p>
          </div>

          <div style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #F5F0E8'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Hand over the item</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Meet the buyer in a safe public location. Hand over the item and allow the buyer to inspect it before confirming receipt. The buyer will confirm receipt in the app.</p>
          </div>

          <div style={{marginBottom:'0'}}>
            <h3 style={{fontSize:'16px', fontWeight:'600', color:'#1E1E1E', marginBottom:'8px'}}>Receive payment</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>After the buyer confirms receipt, there is a 24-hour protection window. Once this passes without a dispute, Renew Store will release 80% of the sale price to your Fawran or bank account.</p>
          </div>
        </div>

        {/* FEES */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'26px', fontWeight:'400', marginBottom:'20px', color:'#1E1E1E'}}>💰 Fees and earnings</h2>
          
          <div style={{background:'#EBF2EC', padding:'20px', borderRadius:'4px', marginBottom:'20px'}}>
            <p style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'600', marginBottom:'8px'}}>Simple fee structure:</p>
            <p style={{fontSize:'14px', color:'#2D5A3D', lineHeight:'1.8'}}>✅ Listing: <strong>Free</strong><br/>✅ Service fee: <strong>20% on successful sales only</strong></p>
          </div>

          <table style={{width:'100%', borderCollapse:'collapse', fontSize:'14px'}}>
            <thead>
              <tr style={{borderBottom:'2px solid #D9CEBC'}}>
                <th style={{textAlign:'left', padding:'10px', color:'#7A7068', fontWeight:'600'}}>Sale price</th>
                <th style={{textAlign:'left', padding:'10px', color:'#7A7068', fontWeight:'600'}}>Service fee (20%)</th>
                <th style={{textAlign:'left', padding:'10px', color:'#2D5A3D', fontWeight:'600'}}>You receive (80%)</th>
              </tr>
            </thead>
            <tbody>
              {[
                [50, 10, 40],
                [100, 20, 80],
                [200, 40, 160],
                [500, 100, 400],
                [1000, 200, 800],
              ].map(([sale, fee, receive]) => (
                <tr key={sale} style={{borderBottom:'1px solid #F5F0E8'}}>
                  <td style={{padding:'10px', color:'#1E1E1E'}}>QAR {sale}</td>
                  <td style={{padding:'10px', color:'#7A7068'}}>QAR {fee}</td>
                  <td style={{padding:'10px', color:'#2D5A3D', fontWeight:'600'}}>QAR {receive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RULES */}
        <div style={{background:'white', padding:'40px', borderRadius:'4px', marginBottom:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'26px', fontWeight:'400', marginBottom:'20px', color:'#1E1E1E'}}>📋 Seller rules</h2>
          
          <div style={{marginBottom:'16px'}}>
            <h3 style={{fontSize:'15px', fontWeight:'600', color:'#2D5A3D', marginBottom:'8px'}}>✅ You can sell:</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Fashion, accessories, furniture, home decor, kids items, toys, sports equipment, electronics, and other pre-loved goods in good condition.</p>
          </div>

          <div style={{marginBottom:'16px'}}>
            <h3 style={{fontSize:'15px', fontWeight:'600', color:'#DC2626', marginBottom:'8px'}}>❌ You cannot sell:</h3>
            <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.8'}}>Weapons, counterfeit goods, alcohol, items prohibited under Qatar law, stolen goods, or items that violate intellectual property rights.</p>
          </div>

          <div style={{background:'#FEF3C7', padding:'16px', borderRadius:'4px'}}>
            <p style={{fontSize:'13px', color:'#D97706', fontWeight:'500', marginBottom:'4px'}}>⚠️ Important</p>
            <p style={{fontSize:'13px', color:'#4A4A4A', lineHeight:'1.7'}}>Always describe your items accurately. Misleading listings will be removed and your account may be suspended. Honest sellers get better reviews and sell faster.</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{background:'#2D5A3D', padding:'40px', borderRadius:'4px', textAlign:'center'}}>
          <h2 style={{fontFamily:'Georgia, serif', fontSize:'28px', fontWeight:'300', color:'white', marginBottom:'12px'}}>Ready to sell?</h2>
          <p style={{fontSize:'14px', color:'rgba(255,255,255,0.8)', marginBottom:'24px'}}>Join hundreds of sellers across Qatar and give your items a second life.</p>
          <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
            <button onClick={() => window.location.href='/sell'} style={{background:'white', color:'#2D5A3D', border:'none', padding:'14px 28px', fontSize:'13px', cursor:'pointer', borderRadius:'2px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'0.05em'}}>Start selling</button>
            <button onClick={() => window.location.href='/faq'} style={{background:'transparent', color:'white', border:'1.5px solid rgba(255,255,255,0.4)', padding:'14px 28px', fontSize:'13px', cursor:'pointer', borderRadius:'2px'}}>Read FAQ</button>
          </div>
        </div>

      </div>
    </main>
  )
}