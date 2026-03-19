import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatBRL } from "../utils/formatPrice"
import { useCart } from "../context/CartContext"
import Header from "../components/Header"
import StarRating from "../components/StarRating"

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <p className="p-10 text-center">Loading...</p>

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-2">
        <h3 className="text-2xl font-semibold mb-8">{product.title}</h3>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex justify-center items-center bg-white p-8 rounded-lg shadow">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] object-contain"
            />
          </div>

          <div className="flex flex-col gap-6 bg-white rounded-lg shadow max-w-78 py-2 px-4">
            <div className="flex items-center gap-2">
              <StarRating rate={product.rating?.rate} />
              <span className="text-gray-700 text-sm">
                {product.rating?.rate}
                <span className="ml-1">({product.rating?.count} reviews)</span>
              </span>
            </div>

            <div className="text-3xl font-bold text-green-600">
              {product.price && formatBRL(product.price)}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-400 px-6 py-3 rounded-lg
                         hover:bg-gray-800 transition w-fit"
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="mt-6 max-w-4xl bg-white rounded-lg shadow-md p-2">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </>
  )
}
