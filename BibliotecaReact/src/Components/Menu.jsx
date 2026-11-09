import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/useAuth'

function Menu() {
  const { usuario, logout, autenticado } = useAuth()
  const navigate = useNavigate()

  function cerrarSesion() {
    logout()
    navigate('/login', { replace: true })
  }

  // Si no ha iniciado sesión, no mostramos el menú
  if (!autenticado) return null

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', background: '#e0e0e0', alignItems: 'center' }}>
      <Link to="/dashboard">Inicio</Link>
      <Link to="/libros">Libros</Link>
      <span style={{ marginLeft: 'auto' }}>
        {usuario?.name} - <b>{usuario?.role}</b>
      </span>
      <button onClick={cerrarSesion} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Cerrar sesión
      </button>
    </nav>
  )
}

export default Menu