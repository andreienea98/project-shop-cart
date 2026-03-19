import { useCart } from "../context/CartContext"
import { formatBRL } from "../utils/formatPrice"
import { useNavigate } from "react-router-dom"
import StarRating from "./StarRating"
import toast from "react-hot-toast"

export default function ProductsList(props) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const productsList = props.products.map(product => (
    <div
      key={product.id}
      className="flex flex-col rounded-lg bg-white p-6 h-full shadow-md"
    >
      <h3
        className="text-center text-lg font-medium leading-tight mb-5 cursor-pointer line-clamp-2"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {product.title}
      </h3>
      <div className="h-40 flex items-center justify-center">
        <img
          onClick={() => navigate(`/products/${product.id}`)}
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain cursor-pointer"
        />
      </div>
      <span className="flex justify-center mt-4">
        <StarRating rate={product.rating.rate}/>
      <span className="flex justify-center text-sm text-gray-700 ml-2">({product.rating.count})</span>
      </span>
      <p className="mt-auto text-center text-lg font-bold p-4">
        {formatBRL(product.price)}
      </p>

      <button
        onClick={() => {
          addToCart(product)
          toast.success(`${product.title} was added to cart`, {
            duration: 2000,
          })
        }}
        className="mt-2 bg-yellow-400 hover:bg-yellow-500 rounded-md py-2 font-medium active:scale-90 transition"
      >
        Add to cart
      </button>
    </div>
  ))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {productsList}
    </div>
  )
}
