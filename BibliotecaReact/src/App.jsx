import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Libros from './Pages/Libros'
import ProtectedRoute from './Auth/ProtectedRoute'
import Menu from './Components/Menu'

function App() {
  return (
    <>
      <Menu />
      
      <Routes>
        {/* Si entran a la raíz, redirigir al dashboard */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
        
        {/* Ruta pública para iniciar sesión */}
        <Route
          path="/login"
          element={<Login />}
        />
        
        {/* Rutas Protegidas (Requieren inicio de sesión) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/libros"
          element={
            <ProtectedRoute>
              <Libros />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App