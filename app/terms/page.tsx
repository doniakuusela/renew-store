'use client'
import Footer from '../../components/Footer'
export default function Terms() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div onClick={() => window.location.href='/'} style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>
      <div style={{maxWidth:'760px', margin:'0 auto', padding:'60px 8%'}}>
        <h1 style={{fontFamily:'Georgia,serif', fontSize:'40px', fontWeight:'600', marginBottom:'8px', color:'#1E1E1E'}}>Terms of Use</h1>
        <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'40px'}}>Last updated: April 2026 · Governed by the laws of the State of Qatar</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>1. Acceptance of Terms</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>By using Renew Store, you agree to these Terms of Use. If you do not agree, please do not use our platform. These terms are governed by the laws of the State of Qatar.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>2. Who Can Use Renew Store</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>You must be at least 18 years old to use Renew Store. By creating an account, you confirm that you are 18 or older and that all information you provide is accurate and truthful.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>3. Buying and Selling</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Renew Store is a platform that connects buyers and sellers. Sellers are responsible for accurately describing their items. Buyers are responsible for reviewing listings carefully before purchasing.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>4. Service Fee</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Renew Store charges a 20% service fee on each successful sale. This service fee is automatically deducted from the seller's payout. Listing items is always free.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>5. Prohibited Items</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>The following items are strictly prohibited: weapons, counterfeit goods, alcohol, items prohibited under Qatar law, stolen goods, and items that violate intellectual property rights. Violations will result in immediate account suspension.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>6. Payments</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>All payments are processed securely through MyFatoorah. Renew Store does not store payment card information. All prices are in Qatari Riyal (QAR). Payments are held by Renew Store until the buyer confirms receipt of the item.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>7. Buyer Protection & Returns</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'10px'}}>Renew Store offers a 24-hour buyer protection window. Here's how it works:</p>
        <ul style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px', paddingLeft:'24px'}}>
          <li style={{marginBottom:'6px'}}>After receiving the item, the buyer has 24 hours to confirm or report any issues.</li>
          <li style={{marginBottom:'6px'}}>If no dispute is raised within 24 hours, the payment is released to the seller automatically.</li>
          <li style={{marginBottom:'6px'}}>If a dispute is raised, Renew Store reviews the case and makes a final decision.</li>
        </ul>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'10px'}}><strong>Accepted reasons for return:</strong></p>
        <ul style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px', paddingLeft:'24px'}}>
          <li style={{marginBottom:'6px'}}>Item does not match the description</li>
          <li style={{marginBottom:'6px'}}>Item is defective or damaged</li>
          <li style={{marginBottom:'6px'}}>Wrong item delivered</li>
        </ul>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}><strong>Not accepted:</strong> buyer changed their mind, item doesn't fit, or buyer doesn't like the item.</p>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>In case of an approved return, the buyer and seller arrange the physical return between themselves. Renew Store does not collect service fee on approved returns.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>8. Communication</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>All communication between buyers and sellers must take place within the Renew Store chat. Sharing personal contact details or arranging transactions outside the platform is prohibited and may result in account suspension.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>9. Liability</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Renew Store provides a platform for users to connect. We are not responsible for the quality, safety, legality, or authenticity of items listed. Renew Store does not verify, inspect, or authenticate any items sold on the platform. Buyers are responsible for assessing the authenticity of items before purchasing. Users interact at their own risk. We encourage safe meeting practices when arranging handovers.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>10. Account Suspension</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Renew Store reserves the right to suspend or terminate any account that violates these terms, engages in fraudulent activity, or negatively impacts other users or the platform.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>11. Changes to Terms</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Renew Store reserves the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms. We will notify users of significant changes by email or by posting a notice on the platform.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>12. Contact</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>For any questions about these terms, contact us at: <a href="mailto:renewstoreqa@gmail.com" style={{color:'#2D5A3D'}}>renewstoreqa@gmail.com</a></p>

      </div>
       <Footer />
    </main>
  )
}