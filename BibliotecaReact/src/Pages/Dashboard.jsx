import { useAuth } from '../Auth/useAuth'

function Dashboard() {
  const { usuario, logout } = useAuth()

  return (
    <main className="contenedor">
      <h1>Dashboard</h1>
      <p>Bienvenido: {usuario?.name}</p>
      <p>Rol: {usuario?.role}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </main>
  )
}

export default Dashboard