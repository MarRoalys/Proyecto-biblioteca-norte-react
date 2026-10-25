function Resumen({ libros }) {
  const total = libros.length
  const disponibles = libros.filter((libro) => libro.estado === 'Disponible').length
  const prestados = total - disponibles

  return (
    <section className="resumen">
      <div className="resumen-card">
        <span>Total Libros</span>
        <strong>{total}</strong>
      </div>
      <div className="resumen-card">
        <span>Disponibles</span>
        <strong>{disponibles}</strong>
      </div>
      <div className="resumen-card">
        <span>Prestados</span>
        <strong>{prestados}</strong>
      </div>
    </section>
  )
}
export default Resumen