import { useNavigate } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import { useCart } from "../context/CartContext"
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@phosphor-icons/react"
import { useRef } from "react"

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalQty,
  } = useCart()

  const timeoutRef = useRef(null)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsCartOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCartOpen(false)
    }, 300)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <button
        onClick={() => {
          navigate("/cart-page")
          setIsCartOpen(false)
        }}
        className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors duration-200"
      >
        <ShoppingCartIcon size={28} weight="regular" />

        {cart.length > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-slate-900 ring-2 ring-white">
            {totalQty}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isCartOpen && (
        <div className="absolute right-0 mt-3 w-96 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-slate-200 z-50 overflow-x-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">
              Shopping Cart ({totalQty})
            </h3>
            <span className="text-md font-bold text-slate-900">
              {formatBRL(totalPrice)}
            </span>
          </div>

          {/* Products list */}
          <div className="max-h-[400px] overflow-y-auto overflow-x-hidden py-2 px-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {cart.length === 0 ? (
              <div className="py-10 text-center uppercase tracking-widest text-xs text-slate-400 font-medium">
                cart is empty
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
                >
                  {/* Image */}
                  <div className="h-14 w-14 flex-shrink-0 bg-white rounded-lg border border-slate-100 p-1 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt=""
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-medium text-slate-500">
                        {item.quantity} x {formatBRL(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Controls qty */}
                  <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="p-1 hover:bg-slate-100 text-slate-600 border-b border-slate-100"
                    >
                      <PlusIcon size={10} weight="bold" />
                    </button>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 hover:bg-slate-100 text-slate-600"
                    >
                      <MinusIcon size={10} weight="bold" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3">
            <button
              onClick={() => {
                navigate("/cart-page")
                setIsCartOpen(false)
              }}
              className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
            >
              Go to cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
