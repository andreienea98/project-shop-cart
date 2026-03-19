import { useNavigate } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import { useCart } from "../context/CartContext"
import { ShoppingCartIcon } from "@phosphor-icons/react"

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalQty
    // animateCart
  } = useCart()

  

  const navigate = useNavigate()

  return (
    <>
      <div
        className="cart-wrapper"
        onMouseEnter={() => setIsCartOpen(true)}
        onMouseLeave={() => setTimeout(() => setIsCartOpen(false), 500)}
      >
        <button
          onClick={() => {
            navigate("/cart-page")
            {
              setIsCartOpen(false)
            }
          }}
        >
          <ShoppingCartIcon size={32} /> {cart.length > 0 && totalQty}
        </button>
        {isCartOpen && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <span>
                Total: <strong>{formatBRL(totalPrice)}</strong>
              </span>
            </div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-title">{item.title}</span>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.title}
                  width="25px"
                />
                <span className="cart-item-price">{formatBRL(item.price)}</span>
                <button
                  className="cart-item-minus"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="cart-item-qty">{item.quantity}</span>
                <button
                  className="cart-item-plus"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
