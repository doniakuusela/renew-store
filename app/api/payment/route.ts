import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, amount } = await request.json()

    const mobileCountryCode = '974'
    const customerMobile = phone.startsWith('974') ? phone.slice(3) : phone

    const response = await fetch('https://api-qa.myfatoorah.com/v2/SendPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MYFATOORAH_API_KEY}`
      },
      body: JSON.stringify({
        InvoiceValue: amount,
        CustomerName: name,
        CustomerEmail: email,
        MobileCountryCode: mobileCountryCode,
        CustomerMobile: customerMobile,
        NotificationOption: 'LNK',
        CallBackUrl: 'https://renew-store.vercel.app/payment-success',
        ErrorUrl: 'https://renew-store.vercel.app/payment-error',
        Language: 'en',
        DisplayCurrencyIso: 'QAR'
      })
    })

    const data = await response.json()

    if (!data.IsSuccess) {
      return NextResponse.json({ error: data.Message }, { status: 400 })
    }

    return NextResponse.json({ url: data.Data.InvoiceURL })

  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}