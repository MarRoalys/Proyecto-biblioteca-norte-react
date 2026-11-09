import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function ProtectedRoute({ children }) {
  const { autenticado, cargandoAuth } = useAuth()

  if (cargandoAuth) {
    return <p>Cargando sesión...</p>
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute