import { useState } from "react"
import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"

export default function Checkout() {
  const { cart } = useCart()
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

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
        if (data.erro) return

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
    <div>
      <div className="form-group">
        <h3>Select delivery address</h3>
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

      <div>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} width="30px" />
            <span className="cart-item-title">{item.title}</span>
            <span className="cart-item-price">{formatBRL(item.price)}</span>
          </div>
        ))}

        <h4>Total price</h4>
        <span>{formatBRL(totalPrice)}</span>
      </div>
    </div>
  )
}
