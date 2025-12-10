import { formatBRL } from "../utils/formatPrice"

export default function Cart(props) {
  console.log(props.cart)

  const totalPrice = props.cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

  return (
    <>
      <button
        onClick={() =>
          props.cart.length > 0 && props.setIsCartOpen(prev => !prev)
        }
      >
        Cart {props.cart.length > 0 && props.cart.length}
      </button>
      {props.isCartOpen && (
        <div className="cart-dropdown">
          <span>Total: {formatBRL(totalPrice)}</span>
          {props.cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.title}</span>
              <img src={item.image} alt={item.title} width="40px" />
              <button onClick={() => props.decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => props.increaseQuantity(item.id)}>+</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
