const paymentService = require("../services/paymentService")

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body

    const clientSecret = await paymentService.createPaymentIntent(amount)

    res.status(200).json({ clientSecret })
  } catch (error) {
    res.status(500).json({
      message: "Could not create payment intent",
    })
  }
}

module.exports = { createPaymentIntent }