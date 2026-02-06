import { useEffect, useState } from "react"
import Header from "../components/Header"
import ProductsList from "../components/ProductsList"
import Filter from "../components/Filter"

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCat, setSelectedCat] = useState([])
  const filteredProducts =
    selectedCat.length === 0
      ? products
      : products.filter(product => selectedCat.includes(product.category))

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <Header />
      <Filter
        products={products}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
      />
      <ProductsList products={filteredProducts} />
    </>
  )
}
