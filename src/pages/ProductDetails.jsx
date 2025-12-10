import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"

export default function ProductDetails() {
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
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} style={{width: '200px'}}/>
      <p>Rating: {product.rating?.rate}</p>
      <p>{product.price && formatBRL(product.price)}</p>
      <p>{product.description}</p>
    </>
  )
}
