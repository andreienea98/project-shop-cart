import { Link } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"

export default function Cart(props) {
  const totalPrice = props.cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

  return (
    <>
      <div className="cart-wrapper">
        <button
          onClick={() =>
            props.cart.length > 0 && props.setIsCartOpen(prev => !prev)
          }
        >
          Cart {props.cart.length > 0 && props.cart.length}
        </button>
        {props.isCartOpen && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <span>Total: {formatBRL(totalPrice)}</span>
              <Link to={"/checkout"}>Go to checkout</Link>
            </div>
            {props.cart.map(item => (
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
                  onClick={() => props.decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="cart-item-qty">{item.quantity}</span>
                <button
                  className="cart-item-plus"
                  onClick={() => props.increaseQuantity(item.id)}
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
