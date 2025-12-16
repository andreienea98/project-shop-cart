import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HouseIcon } from "@phosphor-icons/react"
import ProductsList from "../components/ProductsList"
import Cart from "../components/Cart"

export default function Products(props) {
  const [products, setProducts] = useState([])

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
      </div>
      <ProductsList products={products} addToCart={props.addToCart} />
    </>
  )
}
