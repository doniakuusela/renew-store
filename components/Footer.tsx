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
        <div style={{borderTop:'1px solid #3D7A54', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px'}}>
          <span style={{fontSize:'12px', color:'#B8D4BC'}}>© 2026 Renew Store · Based in Doha, Qatar</span>
          <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
            <a href="https://www.instagram.com/renewstoreqa?igsh=MjY3MTNlYnNvMnhj&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{color:'#B8D4BC', display:'flex', alignItems:'center'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1CdTQ96maM/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{color:'#B8D4BC', display:'flex', alignItems:'center'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}