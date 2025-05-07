import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'ListForce Unlimited Access' },
        unit_amount: 1999
      },
      quantity: 1
    }],
    success_url: `${process.env.NEXTAUTH_URL}/?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=1`
  })
  res.redirect(303, session.url)
}
