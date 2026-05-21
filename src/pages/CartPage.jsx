import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"
import Header from "../components/Header"
import { ShoppingCart, ArrowLeft, TrashIcon } from "@phosphor-icons/react"

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, increaseQuantity, decreaseQuantity, totalPrice, totalQty } =
    useCart()

  // Empty cart screen
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-md mx-auto px-4 py-24 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm mb-5">
            <ShoppingCart size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Your cart is empty
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Looks like you haven't added anything to your cart yet. Head back to
            the shop to find the best deals.
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl transition duration-200 shadow-sm"
          >
            <ArrowLeft size={16} weight="bold" />
            Continue shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
          Shopping cart
        </h1>

        {/* two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* left column: products details */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all duration-200 hover:border-slate-300"
              >
                {/* image container */}
                <div
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="w-28 h-28 shrink-0 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between w-full min-h-[112px]">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h2
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="text-sm font-semibold text-slate-800 hover:text-blue-600 hover:underline underline-offset-2 cursor-pointer line-clamp-2 transition-colors"
                      >
                        {item.title}
                      </h2>

                      <span className="hidden sm:block text-sm font-semibold text-slate-400 tracking-tight whitespace-nowrap">
                        {item.quantity} x {formatBRL(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* quantity control + price mobile */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 sm:border-0 sm:pt-0">
                    <div className="flex items-center bg-slate-100 border border-slate-200 p-1 rounded-xl">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white text-slate-600 rounded-lg transition active:scale-95 font-bold text-base"
                      >
                        {item.quantity === 1 ? <TrashIcon size={18} /> : "-"}
                      </button>

                      <span className="text-xs font-bold text-slate-800 px-3 min-w-[28px] text-center select-none">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white text-slate-600 rounded-lg transition active:scale-95 font-bold text-base"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="sm:hidden text-sm text-slate-400 block mb-0.5">
                        {item.quantity} x {formatBRL(item.price)}
                      </span>
                      <strong className="text-base font-bold text-slate-900">
                        {formatBRL(item.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* right column: order summary */}
          <aside className="lg:sticky lg:top-24 w-full">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Order summary
              </h3>

              <div className="space-y-3 pb-4 border-b border-slate-100 text-sm font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Items ({totalQty})</span>
                  <span className="text-slate-800 font-semibold">
                    {formatBRL(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-4 mt-1">
                <span className="text-sm font-bold text-slate-800">
                  Order Total:
                </span>
                <span className="text-2xl font-semibold text-slate-800 tracking-tight">
                  {formatBRL(totalPrice)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-sm py-3.5 rounded-xl mt-6 transition duration-200 shadow-[0_3px_0_rgb(202,138,4)] active:shadow-none active:translate-y-[3px]"
              >
                Continue to checkout
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
