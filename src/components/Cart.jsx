import { Link } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

  return (
    <>
      <div className="cart-wrapper">
        <button onClick={() => cart.length > 0 && setIsCartOpen(prev => !prev)}>
          Cart {cart.length > 0 && cart.length}
        </button>
        {isCartOpen && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <span>Total: {formatBRL(totalPrice)}</span>
              <Link to={"/checkout"}>Go to checkout</Link>
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
