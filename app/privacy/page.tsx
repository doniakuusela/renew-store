'use client'
import Footer from '@/components/Footer'
export default function Privacy() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div onClick={() => window.location.href='/'} style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>
      <div style={{maxWidth:'760px', margin:'0 auto', padding:'60px 8%'}}>
        <h1 style={{fontFamily:'Georgia,serif', fontSize:'40px', fontWeight:'600', marginBottom:'8px', color:'#1E1E1E'}}>Privacy Policy</h1>
        <p style={{fontSize:'13px', color:'#7A7068', marginBottom:'40px'}}>Last updated: April 2026 · Governed by Qatar PDPL Law No. 13 of 2016</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>1. Who we are</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Renew Store (CR No: 227458) is a marketplace platform operated in Qatar. We connect buyers and sellers of pre-loved goods. Our platform is governed by the laws of the State of Qatar, including the Personal Data Protection Law (PDPL) No. 13 of 2016.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>2. Data we collect</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>We collect the following personal data when you use Renew Store: full name, email address, phone number, location within Qatar, and listing information including photos and descriptions. Payment data is processed securely by MyFatoorah and is never stored on our servers.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>3. How we use your data</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Your data is used solely to operate the Renew Store marketplace — to enable buying, selling, and communication between users. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>4. Data storage & security</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Your data is stored securely with 256-bit SSL encryption by our trusted infrastructure provider. We implement strict access controls to ensure that users can only access their own data. We retain your data for as long as your account is active.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>5. Your rights under Qatar PDPL</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>Under Qatar's Personal Data Protection Law, you have the right to access your personal data, request correction of inaccurate data, request deletion of your data, and withdraw consent at any time. To exercise these rights, contact us at <a href="mailto:renewstoreqa@gmail.com" style={{color:'#2D5A3D'}}>renewstoreqa@gmail.com</a></p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>6. Cookies</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>We use essential cookies only — these are required for the platform to function. We do not use advertising or tracking cookies.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>7. Changes to this Policy</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>We may update this Privacy Policy from time to time. We will notify users of significant changes by email or by posting a notice on the platform. Continued use of Renew Store after changes constitutes acceptance of the updated Policy.</p>

        <h2 style={{fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:'600', marginBottom:'12px', marginTop:'32px', color:'#1E1E1E'}}>8. Contact</h2>
        <p style={{fontSize:'14px', color:'#4A4A4A', lineHeight:'1.85', marginBottom:'16px'}}>For any privacy-related questions, please contact us at: <a href="mailto:renewstoreqa@gmail.com" style={{color:'#2D5A3D'}}>renewstoreqa@gmail.com</a></p>

      </div>
      <Footer />
    </main>
  )
}