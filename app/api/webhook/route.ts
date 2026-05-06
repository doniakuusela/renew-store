import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Webhook received:', JSON.stringify(body))

    const eventType = body.EventType
    const invoiceStatus = body.Data?.InvoiceStatus || body.InvoiceStatus

    if (eventType === 'PaymentSucceeded' || invoiceStatus === 'Paid') {
      const customerEmail = body.Data?.CustomerEmail || body.CustomerEmail || ''
      const invoiceValue = body.Data?.InvoiceValue || body.InvoiceValue || 0
      const callbackUrl = body.Data?.CallBackUrl || body.CallBackUrl || ''

      // Extract params from CallBackUrl
      const urlParams = new URL(callbackUrl)
      const productTitle = urlParams.searchParams.get('title') || 'Item'
      const productEmoji = urlParams.searchParams.get('emoji') || '📦'
      const sellerEmail = urlParams.searchParams.get('seller_email') || ''
      const amount = parseFloat(urlParams.searchParams.get('amount') || '0')
      const listingId = urlParams.searchParams.get('listing_id') || ''

      // Find buyer by email
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single()

      if (profile) {
        // Create order
        const { data: order, error } = await supabase.from('orders').insert({
          buyer_id: profile.id,
          buyer_email: customerEmail,
          seller_email: sellerEmail,
          product_title: productTitle,
          product_emoji: productEmoji,
          amount: amount || invoiceValue,
          status: 'confirmed'
        }).select().single()

        if (!error && order) {
          // Mark listing as sold
          if (listingId) {
            await supabase.from('listings').update({ status: 'sold' }).eq('id', listingId)
          }

          // Create initial chat message
          await supabase.from('chat_messages').insert({
            order_id: order.id,
            sender_email: 'renewstoreqa@gmail.com',
            message: `Hi! Your order for "${productTitle}" has been confirmed. Please use this chat to arrange the pickup with the seller. 🌿`
          })

          // Send emails
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://renew-store.com'}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: customerEmail,
              subject: '✅ Payment confirmed — Renew Store',
              message: `Your payment of QAR ${amount} for "${productTitle}" has been confirmed! The seller will contact you via chat to arrange pickup.`,
              type: 'order_confirmed'
            })
          })

          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://renew-store.com'}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: sellerEmail,
              subject: '🛍️ You have a new order — Renew Store',
              message: `Great news! "${productTitle}" sold for QAR ${amount}. Please contact the buyer via chat to arrange pickup.`,
              type: 'order_confirmed'
            })
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}