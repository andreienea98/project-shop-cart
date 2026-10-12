import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message || ""
  const { setUser } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )

      const data = await response.json()
      if (!response.ok) {
        setMessage(data.message)
        return
      }

      setUser(data.user)
      navigate("/products")
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-[#eaeded]">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          {successMessage && (
            <p className="text-green-600 text-sm text-center mt-4">
              {successMessage}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="e.g user@gmail.com"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="************"
              required
              className=" w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
            >
              Enter
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            You don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
          {message && (
            <p className="text-red-600 text-sm text-center mt-4">{message}</p>
          )}
        </div>
      </div>
    </>
  )
}
