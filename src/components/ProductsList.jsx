import { formatBRL } from "../utils/formatPrice"
import {useParams} from "react-router-dom"
import AddToCartButton from "./AddToCartButton"
// import { addToCart, increaseQuantity, decreaseQuantity } from "../utils/helpers"

export default function ProductsList(props) {
  const params = useParams()
  
  const productsList = props.products.map(product => (
    <div key={product.id} className="product-card">
      <h3 className="product-title">{product.title}</h3>
      <img
        onClick={() => props.navigate(`/products/${product.id}`)}
        width="150px"
        src={product.image}
        alt={product.title}
      />
      <p className="price">{formatBRL(product.price)}</p>
    <AddToCartButton addToCart={props.addToCart} product={product} />
    </div>
  ))

  return (
    <>
      <div className="products-grid">{productsList}</div>
      {}
    </>
  )
}
