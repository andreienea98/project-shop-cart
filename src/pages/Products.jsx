import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HouseIcon } from "@phosphor-icons/react"
import ProductsList from "../components/ProductsList"
import Cart from "../components/Cart"

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

  function addToCart(product) {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  function increaseQuantity(id) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseQuantity(id) {
    setCart(prevCart => {
      const updated = prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)

      if (updated.length === 0) {
        setIsCartOpen(false)
      }
      return updated
    })
  }

  return (
    <>
      <button onClick={() => navigate("/")}>{<HouseIcon size={32} />}</button>
      <Cart
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
      />
      <ProductsList
        products={products}
        navigate={navigate}
        addToCart={addToCart}
      />
    </>
  )
}
