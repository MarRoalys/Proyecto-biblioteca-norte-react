import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LibroForm from '../Components/LibroForm'
import api from '../Api/api'
import { updateLibro } from '../Api/librosApi'
import Encabezado from '../Components/Encabezado'
import '../App.css'

export default function LibroEditar() {
  const { id } = useParams() // Captura el ID de la URL (ej. /libros/editar/5)
  const navigate = useNavigate()
  const [libroOriginal, setLibroOriginal] = useState(null)
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [cargando, setCargando] = useState(true)

  // 1. Buscamos los datos actuales del libro al cargar la página
 useEffect(() => {
    const cargarLibro = async () => {
      try {
        setCargando(true)
        const respuesta = await api.get(`/api/Libros/${id}`) 
        setLibroOriginal(respuesta.data)
      } catch (err) {
        // Agregamos la validación del 404 aquí:
        if (err.response?.status === 404) {
          alert('El libro no fue encontrado.')
          navigate('/libros') // Te regresa al listado de libros
        } else {
          setError('No fue posible cargar los datos del libro para editar.')
        }
      } finally {
        setCargando(false)
      }
    }
    cargarLibro()
  }, [id, navigate])

  // 2. Función para enviar el PUT con los datos modificados
  const guardar = async (form) => {
    try {
      setGuardando(true)
      setError('')
      
      // Volvemos a asegurar los tipos de datos numéricos para .NET
      const payload = {
        ...form,
        idLibro: Number(id), // Adjuntamos el ID original por si .NET lo exige en el cuerpo
        idAutor: Number(form.idAutor),
        idCategoria: Number(form.idCategoria),
        idEditorial: Number(form.idEditorial),
        stock: Number(form.stock),
        estado: Number(form.estado)
      }
      
      await updateLibro(id, payload)
      navigate('/libros') // Volvemos a la lista tras actualizar
      
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Revise los datos enviados. Faltan campos requeridos o hay IDs inválidos.')
      } else if (err.response?.status === 403) {
        setError('No tiene permiso para editar libros.')
      } else {
        setError('No fue posible actualizar el libro en la base de datos.')
      }
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) {
    return (
      <>
        <Encabezado />
        <main className="contenedor">
          <p className="mensaje">Cargando información del libro...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Encabezado />
      <main className="contenedor">
        <h2>Editar Libro</h2>
        {error && <p className="mensaje-error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        
        {guardando ? (
          <p>Actualizando libro, por favor espere...</p>
        ) : (
          <LibroForm 
            initialData={libroOriginal} 
            onSubmit={guardar} 
            submitText="Actualizar Libro" 
          />
        )}
      </main>
    </>
  )
}