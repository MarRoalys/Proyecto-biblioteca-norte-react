import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function ProtectedRoute({ children, roles }) { // <-- 1. Agregado 'roles' aquí
  const { autenticado, cargandoAuth, usuario } = useAuth() // <-- 2. Agregado 'usuario' aquí

  if (cargandoAuth) {
    return <p>Cargando sesión...</p>
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(usuario?.role)) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30px', padding: '10px' }}>
        <h1 style={{ color: '#d9534f' }}>Error 403: Acceso Denegado</h1>
        <p style={{ fontSize: '20px' }}>
          Tu rol actual (<b>{usuario?.role}</b>) no tiene los permisos necesarios para realizar esta acción.
        </p>
      </div>
    );
  }

  return children
}

export default ProtectedRoute