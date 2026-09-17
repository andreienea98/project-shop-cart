import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import CartPage from "./pages/CartPage"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
