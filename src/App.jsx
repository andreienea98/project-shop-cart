import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import CartPage from "./pages/CartPage"
import { useEffect, useState } from "react"
import Cart from "./components/Cart"

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

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

  const hideCart =
    location.pathname === "/checkout" || location.pathname === "/"

  return (
    <>
      {!hideCart && (
        <Cart
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
        />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/products"
          element={
            <Products
              cart={cart}
              addToCart={addToCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/cart-page" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
