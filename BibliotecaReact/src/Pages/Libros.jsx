import api from '../Api/api'
import { useEffect, useState } from 'react'
import '../App.css'
import Encabezado from '../Components/Encabezado'
import LibroCard from '../Components/LibroCard'
import Resumen from '../Components/Resumen'

const API_URL = import.meta.env.VITE_API_URL

function Libros() {
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
    // Usamos Axios. Él automáticamente le pegará tu Token JWT a esta petición
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
      // Ahora usamos api.get para que también envíe el token automáticamente
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
        <Resumen libros={libros} />
        <div className="barra">
          <h2>Libros registrados</h2>
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
              <LibroCard key={libro.idLibro || libro.id} libro={libro} />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default Libros