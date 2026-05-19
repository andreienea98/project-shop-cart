import { useNavigate } from "react-router-dom"
import Cart from "./Cart"
import { ShoppingBag } from "@phosphor-icons/react"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-3.5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-900 hover:opacity-80 transition-opacity font-black text-xl tracking-tight"
        >
          <ShoppingBag size={28} weight="bold" className="text-yellow-500" />
          <span>
            Shop<span className="text-yellow-500">.</span>
          </span>
        </button>

        <Cart />
      </div>
    </header>
  )
}
