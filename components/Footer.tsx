export default function Footer() {
  return (
    <footer style={{background:'#2D5A3D', color:'#F5F0E8', padding:'48px 5% 32px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{display:'flex', flexWrap:'wrap', gap:'40px', marginBottom:'40px'}}>
          <div style={{flex:'1', minWidth:'200px'}}>
            <div style={{fontSize:'20px', fontWeight:'600', marginBottom:'8px'}}>🌿 Renew Store</div>
            <p style={{fontSize:'13px', color:'#B8D4BC', lineHeight:'1.7'}}>Qatar's marketplace for pre-loved items.</p>
          </div>
          <div style={{flex:'1', minWidth:'150px'}}>
            <div style={{fontSize:'12px', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', color:'#B8D4BC', marginBottom:'12px'}}>Learn more</div>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <a href="/how-it-works" style={{fontSize:'13px', color:'#F5F0E8', textDecoration:'none'}}>How it works</a>
              <a href="/seller-guide" style={{fontSize:'13px', color:'#F5F0E8', textDecoration:'none'}}>Seller guide</a>
              <a href="/faq" style={{fontSize:'13px', color:'#F5F0E8', textDecoration:'none'}}>FAQ</a>
            </div>
          </div>
          <div style={{flex:'1', minWidth:'150px'}}>
            <div style={{fontSize:'12px', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', color:'#B8D4BC', marginBottom:'12px'}}>Legal</div>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <a href="/terms" style={{fontSize:'13px', color:'#F5F0E8', textDecoration:'none'}}>Terms of Use</a>
              <a href="/privacy" style={{fontSize:'13px', color:'#F5F0E8', textDecoration:'none'}}>Privacy Policy</a>
            </div>
          </div>
          <div style={{flex:'1', minWidth:'150px'}}>
            <div style={{fontSize:'12px', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase', color:'#B8D4BC', marginBottom:'12px'}}>Contact</div>
            <a href="mailto:renewstoreqa@gmail.com" style={{fontSize:'13px', color:'#F5F0E8', textDecoration:'none'}}>renewstoreqa@gmail.com</a>
          </div>
        </div>
        <div style={{borderTop:'1px solid #3D7A54', paddingTop:'24px', fontSize:'12px', color:'#B8D4BC'}}>
          © 2026 Renew Store · Based in Doha, Qatar
        </div>
      </div>
    </footer>
  )
}