function Resumen({ libros = [] }) {
  const total = libros.length
  const disponibles = libros.filter(l => l.estado === 1 || l.estado === true).length
  const prestados = total - disponibles

  return (
    <section className="resumen">
      <div className="tarjeta-resumen">
        <h4>Total Libros</h4>
        <p>{total}</p>
      </div>
      <div className="tarjeta-resumen">
        <h4>Disponibles</h4>
        <p>{disponibles}</p>
      </div>
      <div className="tarjeta-resumen">
        <h4>Prestados</h4>
        <p>{prestados}</p>
      </div>
    </section>
  )
}

export default Resumen