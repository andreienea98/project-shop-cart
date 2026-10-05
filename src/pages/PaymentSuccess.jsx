import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function PaymentSuccess() {
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [error, setError] = useState(null)
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      setError("No payment session was found.")
      return
    }

    async function verifyPayment() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/payment/session/${sessionId}`,
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message)
        }

        setPaymentStatus(data.paymentStatus)

        if (data.paymentStatus === "paid") {
          clearCart()
        }
      } catch (error) {
        setError(error.message)
      }
    }

    verifyPayment()
  }, [sessionId])

  if (paymentStatus === "loading") {
    return <p>Checking your payment...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (paymentStatus !== "paid") {
    return <p>Payment was not successful.</p>
  }

  return (
    <div>
      <h1>Payment successful!</h1>
      <p>Thank you for your order.</p>
    </div>
  )
}
