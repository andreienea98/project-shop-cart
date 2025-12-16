import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import Cart from "../components/Cart"

export default function ProductDetails(props) {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <p>Loading...</p>

  // console.log(product.rating.rate)

  return (
    <>
      
      <div>
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} width="200px" />
        <p>Rating: {product.rating?.rate}</p>
        <p>{product.price && formatBRL(product.price)}</p>
        <p>{product.description}</p>
        <button onClick={() => props.addToCart(product)}>Add to cart</button>
      </div>
    </>
  )
}
