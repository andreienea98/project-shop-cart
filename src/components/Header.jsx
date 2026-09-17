import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cart from "./Cart"
import {
  ShoppingBagIcon,
  UserIcon,
  SignOutIcon,
  CaretDownIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    setIsDropdownOpen(false)
    logout()
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-3.5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-900 hover:opacity-80 transition-opacity font-black text-xl tracking-tight"
        >
          <ShoppingBagIcon
            size={28}
            weight="bold"
            className="text-yellow-500"
          />
          <span>
            Shop<span className="text-yellow-500">.</span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-xl" />
          ) : !user ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 active:scale-95 transition-all text-sm font-semibold"
            >
              <UserIcon size={20} weight="bold" />
              <span>Log in</span>
            </button>
          ) : (
            <div
              className="relative py-1"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-all text-sm font-semibold">
                <div className="h-7 w-7 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <span>Hi, {user.name?.split(" ")[0]}</span>
                <CaretDownIcon
                  size={14}
                  weight="bold"
                  className={`text-slate-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full pt-1 w-48 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {user.email || user.name}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false)
                        navigate("/orders")
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <UserCircleIcon size={18} />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <SignOutIcon size={18} weight="bold" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <Cart />
        </div>
      </div>
    </header>
  )
}
