import { useNavigate } from "react-router-dom"

export default function CartPage(){
  const navigate = useNavigate()

    return (
        <>
          <div>
            <h2>Shopping Cart</h2>
            <button onClick={() => navigate("/checkout")}>Go to checkout</button>
          </div>
        </>
    )
}