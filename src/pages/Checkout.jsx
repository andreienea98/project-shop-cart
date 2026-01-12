import { useState } from "react"
import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"

export default function Checkout() {
  const { cart } = useCart()
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

  const totalQty = cart.reduce((acc, curr) => acc + curr.quantity, 0)

  const [formData, setFormData] = useState({
    cep: "",
    street: "",
    bairro: "",
    city: "",
    state: "",
  })

  function handleCepSearch() {
    const cepOnlyNumbers = formData.cep.replace(/\D/g, "")

    if (cepOnlyNumbers.length !== 8) return

    fetch(`https://viacep.com.br/ws/${cepOnlyNumbers}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.error) return

        setFormData(prev => ({
          ...prev,
          street: data.logradouro,
          bairro: data.bairro,
          city: data.localidade,
          state: data.uf,
        }))
      })
  }

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <div className="checkout-card">
          <h3>Delivery address</h3>
          <form action="">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" id="firstname" name="firstname" />

            <label htmlFor="lastname">Lastname</label>
            <input type="text" id="lastname" name="lastname" />

            <label htmlFor="telephone">Phone number</label>
            <input type="number" id="telephone" name="telephone" />

            <label htmlFor="cep">CEP</label>
            <input
              type="number"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={e => setFormData({ ...formData, cep: e.target.value })}
              onBlur={handleCepSearch}
            />
            <label htmlFor="street">Street name</label>
            <input
              type="text"
              value={formData.street}
              id="street"
              name="street"
            />
            <label htmlFor="house-nr">Street number</label>
            <input type="number" id="house-nr" name="house-nr" />

            <label htmlFor="city">City</label>
            <input type="text" value={formData.city} id="city" name="city" />

            <label htmlFor="state">State</label>
            <input type="text" value={formData.state} id="state" name="state" />

            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              value={formData.bairro}
              id="bairro"
              name="bairro"
            />
          </form>
        </div>

        <div className="checkout-card">
          <h3>Payment method</h3>
        </div>

        <div className="checkout-card">
          <h3>Review items</h3>

          {cart.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <strong>{formatBRL(item.price)}</strong>
                <p>Qty. {item.quantity}</p>
              </div>
            </div>
          ))}
          
        <button className="place-order-btn">Place your order</button>
        </div>
      </div>

      <div className="checkout-right">
        <div className="order-summary">
          <button className="place-order-btn">Place your order</button>

          <div className="summary-row">
            <span>Items:</span>
            <span>{formatBRL(totalPrice)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row total">
            <strong>Total</strong>
            <strong>{formatBRL(totalPrice)}</strong>
          </div>

        </div>
      </div>
    </div>
  )
}
