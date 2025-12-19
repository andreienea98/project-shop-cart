import { Navigate } from "react-router-dom";
import Cart from "./Cart";
import { HouseIcon } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="products-header">
      <button onClick={() => Navigate("/")}>{<HouseIcon size={32} />}</button>
      <Cart />
    </header>
  )
}
