import { useEffect, useState } from "react"
import ProductsList from "../components/ProductsList"
import Header from "../components/Header"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <Header />
      <ProductsList products={products} />
    </>
  )
}
