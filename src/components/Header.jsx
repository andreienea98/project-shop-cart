import { useNavigate } from "react-router-dom"
import Cart from "./Cart"
import { ShoppingBag, User } from "@phosphor-icons/react"

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

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:scale-95 transition-all text-sm font-semibold"
          >
            <User size={20} weight="bold" />
            <span>Log in</span>
          </button>

        <Cart />
        </div>
      </div>
    </header>
  )
}
