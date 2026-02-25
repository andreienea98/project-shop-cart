import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import { useCart } from "../context/CartContext"
import Header from "../components/Header"

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <>
      <Header />
      <div>
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} width="200px" />
        <p>Rating: {product.rating?.rate}</p>
        <p>{product.price && formatBRL(product.price)}</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </>
  )
}
