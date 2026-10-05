const stripe = require("../config/stripe")

const createCheckoutSession = async (amount) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "elements",
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "ProjectShopCart Order",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],

    return_url: "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
  })

  return session.client_secret
}

const getCheckoutSession = async (sessionId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return {
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email,
  }
}

module.exports = { createCheckoutSession, getCheckoutSession }