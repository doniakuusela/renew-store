import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build')

export async function GET(request: Request) {
  // Security check
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find orders where buyer confirmed receipt but 24h has passed
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'completed')
      .not('received_at', 'is', null)
      .lt('received_at', twentyFourHoursAgo)

    if (error) throw error

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: 'No payouts due' })
    }

    // Send email for each order that needs payout
    for (const order of orders) {
      await resend.emails.send({
        from: 'Renew Store <noreply@renew-store.com>',
        to: ['renewstoreqa@gmail.com'],
        subject: `💰 Time to release payment — ${order.product_title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #2D5A3D; font-family: Georgia, serif; font-weight: 300;">🌿 Renew Store</h1>
            <div style="background: #EBF2EC; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
              <h2 style="color: #2D5A3D; margin-bottom: 8px;">✅ Time to release payment!</h2>
              <p style="color: #4A4A4A;">The 24-hour protection window has passed for this order:</p>
              <ul style="color: #4A4A4A;">
                <li><strong>Product:</strong> ${order.product_title}</li>
                <li><strong>Amount:</strong> QAR ${order.amount}</li>
                <li><strong>Seller payout (80%):</strong> QAR ${(order.amount * 0.8).toFixed(0)}</li>
                <li><strong>Your service fee (20%):</strong> QAR ${(order.amount * 0.2).toFixed(0)}</li>
                <li><strong>Seller:</strong> ${order.seller_email}</li>
                <li><strong>Buyer confirmed receipt:</strong> ${new Date(order.received_at).toLocaleString()}</li>
              </ul>
            </div>
            <a href="https://renew-store.com/admin" style="display: block; text-align: center; background: #2D5A3D; color: white; padding: 14px 32px; text-decoration: none; border-radius: 2px; font-size: 13px;">Go to Admin Panel</a>
          </div>
        `
      })
    }

    return NextResponse.json({ 
      message: `Sent ${orders.length} payout reminder(s)`,
      orders: orders.length 
    })

  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
