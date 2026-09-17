import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"
import { useNavigate } from "react-router-dom"
import StarRating from "./StarRating"
import toast from "react-hot-toast"

export default function ProductsList({ products }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
      {products.map((product) => (
        <div
          key={product.id}
          className="group flex flex-col rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full relative"
        >
          {/* image container */}
          <div
            onClick={() => navigate(`/products/${product.id}`)}
            className="aspect-square w-full bg-white rounded-xl p-6 flex items-center justify-center cursor-pointer overflow-hidden mb-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* product info */}
          <div className="flex flex-col flex-1">
            <h3
              className="text-sm font-semibold text-center text-slate-800 leading-snug mb-2 cursor-pointer line-clamp-2 hover:text-blue-600 transition-colors min-h-[40px]"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <StarRating rate={product.rating?.rate} />
              <span className="text-xs font-medium text-slate-500">
                ({product.rating?.count})
              </span>
            </div>

            {/* Price and button */}
            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
              <span className="text-xl font-semibold text-slate-800 tracking-tight">
                {formatBRL(product.price)}
              </span>

              <button
                onClick={() => {
                  addToCart(product)
                  toast.success(`${product.title} added`, {
                    duration: 2000,
                    style: {
                      fontSize: "14px",
                      borderRadius: "12px",
                      background: "#1e293b",
                      color: "#fff",
                    },
                  })
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition duration-200 shadow-[0_3px_0_rgb(202,138,4)] active:shadow-none active:translate-y-[3px]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
