import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/useAuth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setCargando(true)
      setError('')
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Correo o contraseña incorrectos.')
      } else {
        setError('No fue posible iniciar sesión.')
      }
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Biblioteca</h1>
        <h2>Iniciar sesión</h2>
        
        <label>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <p className="error-login">{error}</p>}
        
        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </main>
  )
}

export default Login