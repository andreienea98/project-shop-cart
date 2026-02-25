import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [password, setPassword] = useState("gogu#2669")
  const [email, setEmail] = useState("test@email.com")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (password.length > 7 && email !== "") {
      navigate("/products")
    } else {
      setMessage("Sua senha tem menos de 8 caracteres!")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaeded]">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-md font-medium text-right text-gray-700">
            Email
          </label>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="e.g user@gmail.com"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <label htmlFor="password" className="block text-md font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={event => setPassword(event.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Minimum 8 characters"
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
        <p className="text-red-600 text-sm text-center mt-4">{message}</p>
      </div>
    </div>
  )
}
