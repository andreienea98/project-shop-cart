import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [password, setPassword] = useState("12345678")
  const [email, setEmail] = useState("asd@asd")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (password.length > 7 && email !== "") {
      navigate("/products")
    } else {
      setMessage("Sua senha tem menos de 8 caracteres!")
      setTimeout(() => setMessage(""), 5000)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          placeholder="e.g user@gmail.com"
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          onChange={event => setPassword(event.target.value)}
          value={password}
          type="password"
          id="password"
          placeholder="minimum 8 characters"
          required
        />
        <button type="submit">Enter</button>
      </form>
      <p style={{ color: "red" }}>{message}</p>
    </>
  )
}
