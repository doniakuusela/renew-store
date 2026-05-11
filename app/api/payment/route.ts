import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, amount, successUrl } = await request.json()

    const mobileCountryCode = '974'
    const customerMobile = (phone.startsWith('974') ? phone.slice(3) : phone).slice(0, 11)

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
        CallBackUrl: successUrl || 'https://renew-store.com/payment-success',
        UserDefinedField: successUrl || '',
        ErrorUrl: 'https://renew-store.com/payment-error',
        Language: 'en',
        DisplayCurrencyIso: 'QAR'
      })
    })

    const data = await response.json()

    if (!data.IsSuccess) {
      console.log('MyFatoorah error:', JSON.stringify(data))
      return NextResponse.json({ error: data.Message, details: data, validation: data.ValidationErrors }, { status: 400 })
    }

    return NextResponse.json({ url: data.Data.InvoiceURL })

  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}