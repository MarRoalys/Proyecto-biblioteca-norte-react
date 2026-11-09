
import { useAuth } from '../Auth/useAuth' 

function LibroCard({ libro }) {
  const estaDisponible = libro.estado === 1 || libro.estado === true;
  
  // 2. Extraemos la variable del usuario en sesión
  const { usuario } = useAuth(); 

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

      {/* 3. Agregamos los botones mágicos condicionados al rol */}
      {usuario?.role === 'Administrador' && (
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button style={{ padding: '6px 12px', backgroundColor: '#1f4e3d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Editar
          </button>
          <button style={{ padding: '6px 12px', backgroundColor: '#b42318', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Eliminar
          </button>
        </div>
      )}
    </article>
  )
}

export default LibroCard