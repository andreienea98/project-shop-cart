import AuthContext from "./AuthContext"
import { useState, useEffect } from "react"

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        })
        if (!response.ok) {
          setUser(null)
          return
        }

        const data = await response.json()
        setUser(data)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  async function logout() {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    if (response.ok) {
      setUser(null)
    }
  }

  const value = {
    user,
    setUser,
    loading,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
