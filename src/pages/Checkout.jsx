import { formatBRL } from "../utils/formatPrice"

export default function Checkout({cart}) {
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0)
  
  return (
    <div>
      <div>
        <h4>Select a delivery address</h4>
        <section>
          <input type="text" />
        </section>
      </div>

      <div>
        <h3>Total price</h3>
        <span>{formatBRL(totalPrice)}</span>
      </div>
    </div>
  )
}
