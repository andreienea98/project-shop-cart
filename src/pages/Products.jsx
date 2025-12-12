import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HouseIcon } from "@phosphor-icons/react"
import ProductsList from "../components/ProductsList"
import Cart from "../components/Cart"
import { addToCart, increaseQuantity, decreaseQuantity } from "../utils/helpers"

export default function Products() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <div className="products-header">
        <button onClick={() => navigate("/")}>{<HouseIcon size={32} />}</button>
        <Cart
          cart={cart}
          increaseQuantity={id => increaseQuantity(id, setCart)}
          decreaseQuantity={id => decreaseQuantity(id, setCart, setIsCartOpen)}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
        />

      </div>
      <ProductsList
        products={products}
        navigate={navigate}
        addToCart={product => addToCart(product, setCart)}
      />

    </>
  )
}
