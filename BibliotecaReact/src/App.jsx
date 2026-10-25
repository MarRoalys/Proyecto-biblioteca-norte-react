import { useState } from 'react'
import './App.css'
import Encabezado from './Components/Encabezado'
import LibroCard from './Components/LibroCard'
import Resumen from './Components/Resumen'

const librosIniciales = [
  { id: 1, isbn: '978-0132350884', titulo: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Ingeniería de Software', estado: 'Disponible' },
  { id: 2, isbn: '978-0307474728', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', categoria: 'Literatura Clásica', estado: 'Disponible' },
  { id: 3, isbn: '978-0133943030', titulo: 'Ingeniería de Software', autor: 'Ian Sommerville', categoria: 'Ingeniería de Software', estado: 'No Disponible' }
]

function App() {
  const [libros, setLibros] = useState(librosIniciales)
  const [busqueda, setBusqueda] = useState('')

  const librosFiltrados = libros.filter((libro) => {
    const texto = busqueda.toLowerCase()
    return (
      libro.titulo.toLowerCase().includes(texto) ||
      libro.isbn.toLowerCase().includes(texto) ||
      libro.autor.toLowerCase().includes(texto)
    )
  })

  function cambiarEstado(id) {
    setLibros((actuales) =>
      actuales.map((libro) =>
        libro.id === id
          ? {
              ...libro,
              estado: libro.estado === 'Disponible' ? 'No Disponible' : 'Disponible'
            }
          : libro
      )
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
              <LibroCard
                key={libro.id}
                libro={libro}
                onCambiarEstado={cambiarEstado}
              />
            ))}
          </section>
        )}
      </main>
    </>
  )
}
export default App