import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"
import { useNavigate } from "react-router-dom"

export default function ProductsList(props) {
  const navigate = useNavigate()
  const {addToCart} = useCart()
  
  const productsList = props.products.map(product => (
    <div key={product.id} className="product-card">
      <h3 className="product-title">{product.title}</h3>
      <img
        onClick={() => navigate(`/products/${product.id}`)}
        width="150px"
        src={product.image}
        alt={product.title}
      />
      <p className="price">{formatBRL(product.price)}</p>

      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  ))

  return (
    <>
      <div className="products-grid">{productsList}</div>
      {}
    </>
  )
}
