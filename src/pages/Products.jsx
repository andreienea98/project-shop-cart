import { useEffect, useState } from "react"
import Header from "../components/Header"
import ProductsList from "../components/ProductsList"
import Filter from "../components/Filter"
import { Funnel, CaretDown, CaretUp } from "@phosphor-icons/react"

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCat, setSelectedCat] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts =
    selectedCat.length === 0
      ? products
      : products.filter((product) => selectedCat.includes(product.category))

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between bg-white border border-slate-200 text-slate-800 px-5 py-3 rounded-xl font-bold shadow-sm active:bg-slate-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Funnel size={18} className="text-slate-500" />
              Filter
              {selectedCat.length > 0 && (
                <span className="ml-1 bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedCat.length}
                </span>
              )}
            </span>
            {isFilterOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
          </button>

          {/* mobile filter */}
          <div
            className={`
            grid transition-all duration-300 ease-in-out lg:hidden mt-2
            ${isFilterOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"}
          `}
          >
            <div className="overflow-hidden">
              <Filter
                products={products}
                selectedCat={selectedCat}
                setSelectedCat={setSelectedCat}
                isMobileInline={true}
              />
            </div>
          </div>
        </div>

        {/* main layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* desktop filter */}
          <aside className="hidden lg:block w-64 shrink-0 lg:sticky lg:top-24">
            <Filter
              products={products}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              isMobileInline={false}
            />
          </aside>

          <ProductsList products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
