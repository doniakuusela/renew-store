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

    const invoiceStatus = body.Data?.Invoice?.Status
    const invoiceId = body.Data?.Invoice?.Id
    const customerEmail = body.Data?.Customer?.Email

    if (invoiceStatus === 'PAID') {
      // Find pending order by buyer email
      const { data: pending } = await supabase
        .from('pending_orders')
        .select('*')
        .eq('buyer_email', customerEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (pending) {
        // Create order
        const { data: order, error } = await supabase.from('orders').insert({
          buyer_email: pending.buyer_email,
          seller_email: pending.seller_email,
          product_title: pending.product_title,
          product_emoji: pending.product_emoji,
          amount: pending.amount,
          status: 'confirmed'
        }).select().single()

        if (!error && order) {
          // Mark listing as sold
          if (pending.listing_id) {
            await supabase.from('listings').update({ status: 'sold' }).eq('id', pending.listing_id)
          }

          // Create initial chat message
          await supabase.from('chat_messages').insert({
            order_id: order.id,
            sender_email: 'renewstoreqa@gmail.com',
            message: `Hi! Your order for "${pending.product_title}" has been confirmed. Please use this chat to arrange the pickup with the seller. 🌿`
          })

          // Delete pending order
          await supabase.from('pending_orders').delete().eq('id', pending.id)

          // Send emails
          await fetch('https://renew-store.com/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: pending.buyer_email,
              subject: '✅ Payment confirmed — Renew Store',
              message: `Your payment of QAR ${pending.amount} for "${pending.product_title}" has been confirmed! The seller will contact you via chat to arrange pickup.`,
              type: 'order_confirmed'
            })
          })

          await fetch('https://renew-store.com/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: pending.seller_email,
              subject: '🛍️ You have a new order — Renew Store',
              message: `Great news! "${pending.product_title}" sold for QAR ${pending.amount}. Please contact the buyer via chat to arrange pickup.`,
              type: 'order_confirmed'
            })
          })

          await fetch('https://renew-store.com/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'renewstoreqa@gmail.com',
              subject: '💰 New order — Renew Store',
              message: `New order: ${pending.product_title} · QAR ${pending.amount} · Buyer: ${pending.buyer_email} · Seller: ${pending.seller_email}`,
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