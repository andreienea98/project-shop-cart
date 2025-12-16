import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import CartPage from "./pages/CartPage"
import Cart from "./components/Cart"

function App() {
  const location = useLocation()
  const hideCart =
    location.pathname === "/checkout" || location.pathname === "/"

  return (
    <>
      {!hideCart && <Cart />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart-page" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
