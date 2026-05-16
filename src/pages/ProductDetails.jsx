import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import { useCart } from "../context/CartContext"
import Header from "../components/Header"
import StarRating from "../components/StarRating"

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [id])

  if (!product) return <p className="p-10 text-center">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors duration-200 font-medium"
        >
          <div className="p-2 rounded-full bg-white border border-slate-200 group-hover:border-slate-400 shadow-sm transition-all group-hover:-translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Image */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-12 shadow-sm border border-gray-100 flex justify-center sticky top-24">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          {/* Details & Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <nav className="text-xs font-medium uppercase tracking-wider text-blue-600 italic">
                {product.category}
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <StarRating rate={product.rating?.rate} />
                <span className="text-sm font-medium text-gray-500">
                  {product.rating?.rate} <span className="mx-1">•</span>{" "}
                  {product.rating?.count} reviews
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed italic">
              {product.description}
            </p>

            {/* Price & Action Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-gray-200/50 space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {product.price && formatBRL(product.price)}
                </span>
                <span className="text-sm text-green-600 font-semibold uppercase tracking-tighter">
                  In Stock
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#f7ca00] hover:bg-[#f2b000] text-gray-900 font-bold py-4 rounded-full shadow-md transition-all active:scale-[0.98] focus:ring-4 focus:ring-yellow-200"
                >
                  Add to Cart
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full shadow-md transition-all active:scale-[0.98]">
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700 uppercase">
                    Ships from
                  </span>
                  <span>Direct Store</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-700 uppercase">
                    Returns
                  </span>
                  <span>30-day policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
