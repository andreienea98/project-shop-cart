import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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

      navigate("/login", {
        state: {
          message:
            "Your account has been created successfully. You can now log in.",
        },
      })
    } catch (error) {
      setMessage("Could not connect to the server. Please try again.")
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-[#eaeded]">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                type="text"
                id="name"
                placeholder="Your name"
                required
                minLength={2}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="e.g. user@gmail.com"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-red-600 text-sm text-center mt-4">{message}</p>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
