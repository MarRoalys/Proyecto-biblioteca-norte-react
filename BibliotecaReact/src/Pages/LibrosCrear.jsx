import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LibroForm from '../Components/LibroForm'
import { createLibro } from '../Api/librosApi'
import Encabezado from '../Components/Encabezado'
import '../App.css'

export default function LibroCrear() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const guardar = async (form) => {
    try {
      setGuardando(true)
      setError('')
      
      // Convertimos estrictamente los campos a números para complacer a .NET
      const payload = {
        ...form,
        idAutor: Number(form.idAutor),
        idCategoria: Number(form.idCategoria),
        idEditorial: Number(form.idEditorial),
        stock: Number(form.stock),
        estado: Number(form.estado)
      }
      
      await createLibro(payload)
      navigate('/libros', { state: { mensajeExito: 'Registro creado correctamente.' } });
      
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Revise los datos enviados. Faltan campos requeridos o hay IDs inválidos.')
      } else if (err.response?.status === 403) {
        setError('No tiene permiso para crear libros.')
      } else if (err.response?.status === 409) {
        setError('Ya existe un libro registrado con ese ISBN.')
      } else {
        setError('No fue posible guardar el libro en la base de datos.')
      }
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <Encabezado />
      <main className="contenedor">
        <h2>Registrar Nuevo Libro</h2>
        {error && <p className="mensaje-error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        
        {guardando ? (
          <p>Guardando libro, por favor espere...</p>
        ) : (
          <LibroForm onSubmit={guardar} submitText="Guardar Libro" />
        )}
      </main>
    </>
  )
}