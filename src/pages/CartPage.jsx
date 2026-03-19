import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, increaseQuantity, decreaseQuantity, totalPrice, totalQty } = useCart()

  return (
    <div className="cart-page">
      <div className="cart-page-left">
        <div className="checkout-card">
          <h2>Shopping Cart</h2>

          <div className="cart-page-header">
            <span></span>
            <span></span>
            <span className="price-header">Price</span>
          </div>

          {cart.map(item => (
            <div key={item.id} className="cart-page-item">
              <img src={item.image} alt={item.title} />

              <div className="cart-page-info">
                <p className="cart-page-title">{item.title}</p>

                <div className="cart-page-qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <span>-</span>
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <span>+</span>
                  </button>
                </div>
              </div>

              <strong className="cart-page-price">
                {formatBRL(item.price)}
              </strong>
            </div>
          ))}
          <button
            className="place-order-btn"
            onClick={() => navigate("/checkout")}
          >
            Go to checkout
          </button>
        </div>
      </div>

      <div className="cart-page-right">
        <div className="checkout-card cart-summary">
          <div className="summary-row">
            <span>
              Total ({totalQty == 1 ? "1 item" : `${totalQty} items`}):{" "}
              <strong>{formatBRL(totalPrice)}</strong>
            </span>
          </div>
          <button
            className="place-order-btn"
            onClick={() => navigate("/checkout")}
          >
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
