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

      <div className="flex flex-col lg:flex-row gap-6 px-6 py-6 mt-6 max-w-[1600px] mx-auto">
        <Filter
          products={products}
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
        />
        <ProductsList products={filteredProducts} />
      </div>
    </>
  )
}
