import { useEffect, useState } from "react"
import Header from "../components/Header"
import ProductsList from "../components/ProductsList"
import Filter from "../components/Filter"

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCat, setSelectedCat] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
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
      <button
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden bg-black text-white px-4 py-2 rounded-md mx-6 mt-4"
      >
        Filters
      </button>
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 mt-6 max-w-[1600px] mx-auto">
        <div className="lg:w-56 shrink-0">
          <Filter
            products={products}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
          />
        </div>
        <ProductsList products={filteredProducts} />
      </div>
    </>
  )
}
