import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { HouseIcon } from "@phosphor-icons/react";

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="products-header">
      <button onClick={() => navigate("/")}>{<HouseIcon size={32} />}</button>
      <Cart />
    </header>
  )
}
