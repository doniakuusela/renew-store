import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, amount } = await request.json()

    const response = await fetch('https://api.myfatoorah.com/v2/InitiatePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MYFATOORAH_API_KEY}`
      },
      body: JSON.stringify({
        InvoiceAmount: amount,
        CurrencyIso: 'QAR'
      })
    })

    const initiateData = await response.json()

    if (!initiateData.IsSuccess) {
      return NextResponse.json({ error: initiateData.Message }, { status: 400 })
    }

    const paymentResponse = await fetch('https://api.myfatoorah.com/v2/ExecutePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MYFATOORAH_API_KEY}`
      },
      body: JSON.stringify({
        PaymentMethodId: initiateData.Data.PaymentMethods[0].PaymentMethodId,
        CustomerName: name,
        CustomerEmail: email,
        CustomerMobile: phone,
        InvoiceValue: amount,
        CurrencyIso: 'QAR',
        CallBackUrl: 'http://localhost:3000/payment-success',
        ErrorUrl: 'http://localhost:3000/payment-error',
        Language: 'en',
        DisplayCurrencyIso: 'QAR'
      })
    })

    const paymentData = await paymentResponse.json()

    if (!paymentData.IsSuccess) {
      return NextResponse.json({ error: paymentData.Message }, { status: 400 })
    }

    return NextResponse.json({ url: paymentData.Data.PaymentURL })

  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}