import { createContext, useContext } from "react"

const CartContext = createContext({})

export default CartContext

export function useCart() {
  return useContext(CartContext)
}
