'use client'
import { useState } from 'react'

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'What is Renew Store?', a: 'Renew Store is a marketplace in Qatar where you can buy and sell pre-loved items. We focus on fashion, furniture, kids items, and more.' },
      { q: 'Is Renew Store only for Qatar?', a: 'Yes, currently Renew Store operates only in Qatar. All transactions and handovers happen locally.' },
      { q: 'Is it free to use?', a: 'Browsing and listing items is completely free. We charge a 20% service fee only on successful sales.' },
    ]
  },
  {
    category: 'Buying',
    questions: [
      { q: 'How do I pay for an item?', a: 'We use MyFatoorah for secure payments. You can pay with credit card, debit card, or other supported methods.' },
      { q: 'Is my payment safe?', a: 'Yes! Your payment is held securely by Renew Store until you confirm receipt of the item. If something is wrong, you can open a dispute within 24 hours.' },
      { q: 'How do I receive the item?', a: 'After payment, chat opens with the seller. You agree on a meeting time and place to hand over the item. No shipping needed!' },
      { q: 'What if the item is not as described?', a: 'You have 24 hours after receiving the item to open a dispute. We will review your case and help resolve it, including refunding your payment if needed.' },
      { q: 'Can I return an item just because I changed my mind?', a: 'Unfortunately, no. Returns are only accepted for items that don\'t match the description, are defective, or the wrong item was delivered.' },
    ]
  },
  {
    category: 'Selling',
    questions: [
      { q: 'How much does it cost to list an item?', a: 'Listing is 100% free. You only pay a 20% service fee when your item sells successfully.' },
      { q: 'How long does approval take?', a: 'Listings are usually reviewed and approved within 24 hours. You\'ll get an email notification when your listing goes live.' },
      { q: 'When do I get paid?', a: 'After the buyer confirms receipt (or 24 hours pass), we release payment to your preferred method — Fawran or bank transfer.' },
      { q: 'How many photos can I add?', a: 'You can add up to 5 photos per listing. Better photos lead to faster sales!' },
      { q: 'Can I edit my listing later?', a: 'Yes! Go to "My Listings" to edit, pause, or delete your listings anytime. Edits need to be re-approved before going live.' },
    ]
  },
  {
    category: 'Payments & Fees',
    questions: [
      { q: 'How is the 20% service fee calculated?', a: 'If you sell an item for QAR 100, you receive QAR 80. The QAR 20 covers platform maintenance, payment processing, and buyer protection.' },
      { q: 'What payout methods are available?', a: 'Sellers can choose between Fawran (faster, by phone number) or bank transfer (by IBAN).' },
      { q: 'When will the money arrive?', a: 'Once released, Fawran is instant and bank transfers typically take 1-2 business days.' },
    ]
  },
  {
    category: 'Safety & Disputes',
    questions: [
      { q: 'How do I stay safe when meeting someone?', a: 'Meet in public places, preferably during daytime. Never share personal banking details via chat. Always use the Renew Store platform for communication and payments.' },
      { q: 'What if the seller doesn\'t show up?', a: 'Contact us at renewstoreqa@gmail.com and open a dispute. We\'ll refund your payment.' },
      { q: 'How do I report a problem?', a: 'Go to "My Orders" and click "Open dispute" on the relevant order, or email us at renewstoreqa@gmail.com.' },
    ]
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  return (
    <main style={{fontFamily:'sans-serif', background:'#F5F0E8', minHeight:'100vh', paddingTop:'68px'}}>
      <nav style={{background:'rgba(245,240,232,0.95)', borderBottom:'1px solid #D9CEBC', padding:'0 5%', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, left:0, right:0, zIndex:100}}>
        <div style={{fontSize:'22px', color:'#2D5A3D', fontWeight:'600', cursor:'pointer'}} onClick={() => window.location.href='/'}>🌿 Renew Store</div>
        <a href="/" style={{fontSize:'13px', color:'#7A7068', textDecoration:'none'}}>← Back</a>
      </nav>

      <div style={{background:'#2D5A3D', padding:'60px 5% 40px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <p style={{fontSize:'11px', color:'rgba(255,255,255,0.7)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px'}}>Support</p>
          <h1 style={{fontFamily:'Georgia, serif', fontSize:'clamp(32px, 5vw, 48px)', fontWeight:'300', color:'white', lineHeight:'1.1'}}>Frequently Asked Questions</h1>
        </div>
      </div>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'48px 5%'}}>
        {faqs.map((section, sIdx) => (
          <div key={sIdx} style={{marginBottom:'40px'}}>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:'24px', fontWeight:'300', marginBottom:'20px', color:'#2D5A3D'}}>{section.category}</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {section.questions.map((item, qIdx) => {
                const key = `${sIdx}-${qIdx}`
                const isOpen = openIndex === key
                return (
                  <div key={key} style={{background:'white', borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : key)}
                      style={{width:'100%', padding:'18px 20px', background:'none', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'sans-serif', fontSize:'14px', fontWeight:'500', color:'#1E1E1E', display:'flex', justifyContent:'space-between', alignItems:'center'}}
                    >
                      <span>{item.q}</span>
                      <span style={{fontSize:'18px', color:'#2D5A3D'}}>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div style={{padding:'0 20px 20px', fontSize:'13px', color:'#4A4A4A', lineHeight:'1.8'}}>{item.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div style={{background:'#EBF2EC', padding:'24px', borderRadius:'4px', textAlign:'center', marginTop:'40px'}}>
          <p style={{fontSize:'14px', color:'#2D5A3D', fontWeight:'500', marginBottom:'6px'}}>Still have questions?</p>
          <p style={{fontSize:'13px', color:'#4A4A4A', marginBottom:'14px'}}>We're here to help!</p>
          <a href="mailto:renewstoreqa@gmail.com" style={{background:'#2D5A3D', color:'white', padding:'10px 24px', borderRadius:'2px', textDecoration:'none', fontSize:'13px', fontWeight:'500', display:'inline-block'}}>Email us</a>
        </div>
      </div>
    </main>
  )
}