export default function PaymentError() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'white', padding:'48px', borderRadius:'4px', textAlign:'center', maxWidth:'420px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{fontSize:'64px', marginBottom:'16px'}}>❌</div>
        <h1 style={{fontFamily:'Georgia,serif', fontSize:'28px', fontWeight:'300', marginBottom:'12px'}}>Payment failed</h1>
        <p style={{fontSize:'14px', color:'#7A7068', marginBottom:'28px', lineHeight:'1.7'}}>Something went wrong with your payment. Please try again or contact support.</p>
        <a href="/checkout" style={{background:'#2D5A3D', color:'white', padding:'14px 32px', textDecoration:'none', fontSize:'13px', fontWeight:'500', textTransform:'uppercase', letterSpacing:'0.05em'}}>Try again</a>
      </div>
    </main>
  )
}