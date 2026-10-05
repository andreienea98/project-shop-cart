import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import {
  CaretLeftIcon,
  CreditCardIcon,
  MapPinAreaIcon,
} from "@phosphor-icons/react"
import { BsBagCheck } from "react-icons/bs"

import { loadStripe } from "@stripe/stripe-js"
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout"

const stripePromise = loadStripe(
  "pk_test_51TbO0QEefiqLhzqLB86vj9ObafCaNHSPmh7Koc78dJqOMTRn2vXio6FJmvh5oVlbG9RnsweqieytsQarU95ZTmjm00hFjvLT1U",
)

export default function Checkout() {
  const { cart, totalPrice, totalQty } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    cep: "",
    street: "",
    bairro: "",
    city: "",
    state: "",
  })

  const [clientSecret, setClientSecret] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  useEffect(() => {
    async function createCheckoutSession() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Math.round(totalPrice * 100),
            }),
          },
        )

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error(error)
      }
    }

    if (totalPrice > 0) {
      createCheckoutSession()
    }
  }, [totalPrice])

  function handleCepSearch() {
    const cepOnlyNumbers = formData.cep.replace(/\D/g, "")

    if (cepOnlyNumbers.length !== 8) return

    fetch(`https://viacep.com.br/ws/${cepOnlyNumbers}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return

        setFormData((prev) => ({
          ...prev,
          street: data.logradouro,
          bairro: data.bairro,
          city: data.localidade,
          state: data.uf,
        }))
      })
  }

  const inputStyle =
    "w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-sm shadow-sm"
  const labelStyle =
    "block text-xs font-bold text-slate-700 uppercase tracking-wider"

  const stripeAppearance = {
    theme: "flat",
    variables: {
      colorPrimary: "#0f172a", // Slate 900
      colorBackground: "#ffffff",
      colorText: "#1e293b", // Slate 800
      colorDanger: "#ef4444",
      borderRadius: "8px", // Matches your custom layout inputs
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 mb-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-600 hover:text-black transition-colors"
          >
            <CaretLeftIcon size={20} />
            <span className="font-medium">Back to cart</span>
          </button>
          <h1 className="text-xl font-bold text-slate-800 text-center">
            Checkout
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Address form */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 flex items-center gap-4 border-b border-slate-100 bg-slate-50/50">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">
                1
              </span>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MapPinAreaIcon size={20} className="text-slate-500" /> Shipping
                Address
              </h3>
            </div>

            <form className="p-6 grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-3">
                <label htmlFor="firstname" className={labelStyle}>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className={inputStyle}
                  placeholder="John"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="lastname" className={labelStyle}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className={inputStyle}
                  placeholder="Doe"
                />
              </div>

              <div className="md:col-span-6">
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={inputStyle}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="md:col-span-6">
                <label htmlFor="phone" className={labelStyle}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={inputStyle}
                  placeholder="(DDD) 99999-9999"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="cep" className={labelStyle}>
                  Postcode (CEP)
                </label>
                <input
                  type="number"
                  id="cep"
                  name="cep"
                  className={`${inputStyle} bg-yellow-50/30 border-yellow-100`}
                  value={formData.cep}
                  onChange={(e) =>
                    setFormData({ ...formData, cep: e.target.value })
                  }
                  onBlur={handleCepSearch}
                  placeholder="00000-000"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="street" className={labelStyle}>
                  Street Name
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  className={inputStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="house-nr" className={labelStyle}>
                  Nr.
                </label>
                <input
                  type="number"
                  id="house-nr"
                  name="house-nr"
                  className={inputStyle}
                  placeholder="123"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bairro" className={labelStyle}>
                  Neighbourhood
                </label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  className={inputStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, bairro: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="city" className={labelStyle}>
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  className={inputStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="state" className={labelStyle}>
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  className={inputStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
            </form>
          </section>

          {/* Payment */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 flex items-center gap-4 border-b border-slate-100 bg-slate-50/50 opacity-60">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-400 text-white font-bold text-sm">
                2
              </span>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 text-slate-500">
                <CreditCardIcon size={20} /> Payment Method
              </h3>
            </div>
            <div className="p-6">
              {clientSecret ? (
                /* Wrapping the embedded input form inside Stripe's local context manager */
                <CheckoutElementsProvider
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    elementsOptions: { appearance: stripeAppearance },
                  }}
                >
                  <InlineStripeForm
                    email={formData.email}
                    setIsProcessing={setIsProcessing}
                    setPaymentError={setPaymentError}
                  />
                </CheckoutElementsProvider>
              ) : (
                <div className="flex items-center gap-3 py-4">
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-slate-500 font-medium">
                    Loading secure payment fields...
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Review Items */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 flex items-center gap-4 border-b border-slate-100 bg-slate-50/50">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">
                3
              </span>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BsBagCheck size={20} className="text-slate-500" /> Review Items
              </h3>
            </div>
            <div className="p-6 divide-y divide-slate-100">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0 group"
                >
                  <div className="h-20 w-20 flex-shrink-0 rounded-lg border border-slate-100 p-2 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-slate-900 mt-2">
                      {formatBRL(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column - Order summary */}
        <aside className="lg:col-span-4 sticky top-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Items ({totalQty}):</span>
                <span>{formatBRL(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping & handling:</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="py-6 flex justify-between items-baseline">
              <span className="text-lg font-semibold text-slate-900">
                Order Total:
              </span>
              <span className="text-2xl font-semibold text-slate-900">
                {formatBRL(totalPrice)}
              </span>
            </div>

            {/* Error Message Box inside order card container */}
            {paymentError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl leading-relaxed">
                {paymentError}
              </div>
            )}

            <button
              type="submit"
              form="stripe-payment-form"
              disabled={isProcessing}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 rounded-xl shadow-[0_4px_0_rgb(202,138,4)] active:shadow-none active:translate-y-[2px] transition-all mb-4"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                "Place your order"
              )}
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed italic">
              By placing your order, you agree to our terms of use and privacy
              policy.
            </p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
            <div className="h-2 w-2 bg-blue-500 rounded-full mt-1.5 animate-pulse" />
            <p className="text-xs text-blue-700 leading-tight">
              <strong>Fast Shipping:</strong> Your items qualify for express
              delivery at no extra cost.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function InlineStripeForm({ email, setIsProcessing, setPaymentError }) {
  const result = useCheckoutElements()

  const handleStripeSubmit = async (e) => {
    e.preventDefault()

    console.log("Stripe form submitted")
    console.log("Checkout result:", result)

    if (result.type !== "success") {
      console.log("Checkout is not ready:", result.type)
      return
    }

    console.log("Checkout is ready")
    console.log("Can confirm:", result.checkout.canConfirm)

    setIsProcessing(true)
    setPaymentError(null)

    try {
      await result.checkout.updateEmail(email)

      const confirmResult = await result.checkout.confirm()

      console.log("Confirm result:", confirmResult)

      if (confirmResult.type === "error") {
        setPaymentError(confirmResult.error.message)
      }
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      )
    } finally {
      setIsProcessing(false)
    }
  }

  if (result.type === "loading") {
    return <div>Loading checkout...</div>
  }

  if (result.type === "error") {
    return <div>{result.error.message}</div>
  }

  return (
    <form id="stripe-payment-form" onSubmit={handleStripeSubmit}>
      <PaymentElement
        onChange={(event) => {
          console.log("PaymentElement:", event)
          console.log("Payment value:", event.value)
        }}
      />
    </form>
  )
}
