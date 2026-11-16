import api from '../Api/api'
import { deleteLibro } from '../Api/librosApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // <-- 1. AÑADIMOS ESTA IMPORTACIÓN
import '../App.css'
import Encabezado from '../Components/Encabezado'
import LibroCard from '../Components/LibroCard'
import Resumen from '../Components/Resumen'
import { useLocation } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function Libros() {
    const location = useLocation();
  const [success, setSuccess] = useState(location.state?.mensajeExito || '');
  const [libros, setLibros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  async function cargarLibros() {
    try {
      setCargando(true)
      setError('')
      const respuesta = await api.get('/api/Libros') 
      setLibros(respuesta.data)
    } catch (err) {
      setError('No fue posible cargar los libros desde la API.')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  async function cargarCategorias() {
    try {
      const respuesta = await api.get('/api/Catalogos/categorias')
      setCategorias(respuesta.data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }
  
  useEffect(() => {
    cargarLibros()
    cargarCategorias()
  }, [])

  const manejarEliminacion = async (libro) => {
    const confirmar = window.confirm(`¿Desea eliminar el libro "${libro.titulo || 'sin título'}"?`)
    if (!confirmar) return

    try {
      await deleteLibro(libro.id || libro.idLibro) 
      alert('Libro eliminado correctamente.')
      await cargarLibros() 
    } catch (err) {
      const status = err.response?.status;

      if (status === 403) {
        alert('Error 403: No tiene permiso para eliminar este libro.');
      } else if (status === 409 || status === 500) {
        // Agrupamos 409 y 500 porque a veces la API lanza 500 al chocar con llaves foráneas de MySQL
        alert('Error 409 (Conflicto): El libro no puede eliminarse porque está siendo utilizado en otros registros (ej. préstamos).');
      } else {
        alert(`No fue posible eliminar el libro. (Código: ${status || 'Desconocido'})`);
      }
    }
}

  const librosFiltrados = libros.filter((libro) => {
    const texto = busqueda.toLowerCase()
    const coincideTexto = 
      libro.titulo?.toLowerCase().includes(texto) ||
      libro.isbn?.toLowerCase().includes(texto) ||
      libro.autor?.toLowerCase().includes(texto)
    
    const coincideCategoria = categoriaSeleccionada === '' || libro.categoria === categoriaSeleccionada

    return coincideTexto && coincideCategoria
  })

  if (cargando) return <p className="mensaje">Cargando catálogo de libros...</p>

  if (error) {
    return (
      <div className="mensaje-error">
        <p>{error}</p>
        <button onClick={cargarLibros}>Reintentar</button>
      </div>
    )
  }

  return (
    <>
      <Encabezado />
      <main className="contenedor">
        {success && (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
            {success}
          </div>
        )}
        <Resumen libros={libros} />
        <div className="barra">
          <h2>Libros registrados</h2>
          
          {/* 2. AQUÍ ESTÁ EL BOTÓN QUE NAVEGA SIN RECARGAR LA PÁGINA */}
          <Link 
            to="/libros/nuevo" 
            style={{ padding: '8px 15px', backgroundColor: '#2b6cb0', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', marginLeft: '15px' }}
          >
            + Nuevo Libro
          </Link>

          <input
            type="text"
            placeholder="Buscar por título, autor o ISBN..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador"
          />
        </div>
        {librosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No se encontraron libros.</p>
        ) : (
          <section className="grid-animales">
            {librosFiltrados.map((libro) => (
              <LibroCard 
                key={libro.idLibro || libro.id} 
                libro={libro} 
                onEliminar={manejarEliminacion} 
              />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default Libros