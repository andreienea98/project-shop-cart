import { useNavigate } from "react-router-dom"
import Cart from "./Cart"
import { HouseIcon } from "@phosphor-icons/react"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          {<HouseIcon size={32} />}
        </button>
        <Cart />
      </div>
    </header>
  )
}
