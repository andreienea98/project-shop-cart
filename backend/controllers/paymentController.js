const paymentService = require("../services/paymentService")

const createCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body

    const clientSecret =
      await paymentService.createCheckoutSession(amount)

    res.status(200).json({ clientSecret })
  } catch (error) {
    res.status(500).json({
      message: "Could not create checkout session",
    })
  }
}

const getCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.params

    const session = await paymentService.getCheckoutSession(sessionId)

    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { createCheckoutSession, getCheckoutSession }