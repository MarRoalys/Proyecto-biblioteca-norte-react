
function LibroCard({ libro }) {
  const estaDisponible = libro.estado === 1 || libro.estado === true

  return (
    <article className="animal-card">
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
    </article>
  )
}

export default LibroCard