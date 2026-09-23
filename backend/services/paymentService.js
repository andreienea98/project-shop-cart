const stripe = require("../config/stripe")

const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "brl",
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return paymentIntent.client_secret
}

module.exports = { createPaymentIntent }