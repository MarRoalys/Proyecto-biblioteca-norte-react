import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Libros from './Pages/Libros'
import ProtectedRoute from './Auth/ProtectedRoute'
import Menu from './Components/Menu'
import LibroCrear from './Pages/LibrosCrear'
import LibroEditar from './Pages/LibroEditar'

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
        
        <Route 
         path="/libros/nuevo" 
         element={
         <ProtectedRoute roles={['Administrador', 'Bibliotecario']}>
           {/* AQUÍ ESTÁ LA CORRECCIÓN: Le quitamos la "s" */}
           <LibroCrear />
         </ProtectedRoute>
         } 
        />

        <Route 
        path="/libros/editar/:id" 
        element={
       <ProtectedRoute roles={['Administrador', 'Bibliotecario']}>
       <LibroEditar />
      </ProtectedRoute>
       } 
       />
      </Routes>
    </>
  )
}

export default App