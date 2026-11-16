
import { useAuth } from '../Auth/useAuth'
import { Link } from 'react-router-dom' // 1. Importamos Link

function LibroCard({ libro, onEliminar }) {
  const estaDisponible = libro.estado === 1 || libro.estado === true;
  const { usuario } = useAuth(); 

  // Aseguramos de usar el ID correcto según cómo venga de tu BD
  const idDelLibro = libro.idLibro || libro.id; 

  return (
    <article className="Libro-card">
      <h3>{libro.titulo || 'Sin título'}</h3>
      <p><strong>ISBN:</strong> {libro.isbn}</p>
      <p><strong>Autor:</strong> {libro.autor || 'Sin autor'}</p>
      <p><strong>Categoría:</strong> {libro.categoria || 'General'}</p>
      <p><strong>Editorial:</strong> {libro.editorial || 'Sin editorial'}</p>
      <p><strong>Stock:</strong> {libro.stock}</p>
      <p>
        <strong>Estado:</strong>{' '}
        <span className={estaDisponible ? 'badge-disponible' : 'badge-prestado'}>
          {estaDisponible ? 'Disponible' : 'Prestado'}
        </span>
      </p>

      {usuario?.role === 'Administrador' && (
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          
          {/* 2. Reemplazamos el botón por un Link que lleva el ID en la URL */}
          <Link 
            to={`/libros/editar/${idDelLibro}`}
            style={{ padding: '6px 12px', backgroundColor: '#1f4e3d', color: 'white', textDecoration: 'none', border: 'none', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
          >
            Editar
          </Link>
          
          <button 
            onClick={() => onEliminar(libro)}
            style={{ padding: '6px 12px', backgroundColor: '#b42318', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  )
}

export default LibroCard