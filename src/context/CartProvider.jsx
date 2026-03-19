import { useEffect, useState } from "react"
import CartContext from "./CartContext"

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  // const [animateCart, setAnimateCart] = useState(false)

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  )

  const totalQty = cart.reduce((acc, curr) => acc + curr.quantity, 0)

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
    // setAnimateCart(true)
    // setTimeout(() => setAnimateCart(false), 300)
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

  const value = {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalQty
    // animateCart
  }

  return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>     
)
}
