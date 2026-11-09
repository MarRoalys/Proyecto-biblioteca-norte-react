import { createContext, useEffect, useState } from 'react'
import api from '../Api/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(null)
  const [cargandoAuth, setCargandoAuth] = useState(true)

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token')
    const usuarioGuardado = localStorage.getItem('usuario')
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado)
      setUsuario(JSON.parse(usuarioGuardado))
    }
    setCargandoAuth(false)
  }, [])

  async function login(email, password) {
    const respuesta = await api.post('/api/Auth/login', { email, password })
    const datos = respuesta.data
    const usuarioSesion = {
      name: datos.name,
      email: datos.email,
      role: datos.role,
      expiresAt: datos.expiresAt
    }
    setToken(datos.token)
    setUsuario(usuarioSesion)
    localStorage.setItem('token', datos.token)
    localStorage.setItem('usuario', JSON.stringify(usuarioSesion))
    return usuarioSesion
  }

  function logout() {
    setToken(null)
    setUsuario(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  const autenticado = Boolean(token)

  return (
    <AuthContext.Provider value={{ usuario, token, autenticado, cargandoAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}