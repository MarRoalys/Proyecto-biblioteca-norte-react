
function LibroCard({ libro, onCambiarEstado}) {
  return (
    <article className="animal-card"> {/* Usamos animal-card para que el CSS coincida luego */}
      <h3>{libro.titulo}</h3>
      <p><strong>ISBN:</strong> {libro.isbn}</p>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Categoría:</strong> {libro.categoria}</p>
      <p><strong>Estado:</strong> {libro.estado}</p>
      <button onClick={() => onCambiarEstado(libro.id)}>
        Cambiar estado
      </button>
    </article>
  )

}
export default LibroCard