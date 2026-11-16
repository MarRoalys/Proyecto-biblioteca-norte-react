import { useEffect, useState } from 'react'
import api from '../Api/api'

const inicial = {
  titulo: '',
  isbn: '',
  idAutor: '',      // Cambiamos 'autor' por 'idAutor'
  idCategoria: '',  // Cambiamos 'categoria' por 'idCategoria'
  idEditorial: '',  // Cambiamos 'editorial' por 'idEditorial'
  stock: 0,
  estado: 1 
}

export default function LibroForm({ initialData = inicial, onSubmit, submitText = 'Guardar' }) {
  const [form, setForm] = useState(initialData)
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({ ...inicial, ...initialData })
  }, [initialData])

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const respuesta = await api.get('/api/Catalogos/categorias')
        setCategorias(respuesta.data)
      } catch {
        setError('No fue posible cargar las categorías.')
      }
    }
    cargarCatalogos()
  }, [])

  const cambiar = (event) => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const enviar = (event) => {
    event.preventDefault()
    if (!form.titulo.trim() || !form.isbn.trim()) {
      setError('El título y el ISBN son obligatorios.')
      return
    }
    setError('')
    onSubmit(form) 
  }

  return (
    <form onSubmit={enviar} style={{ display: 'grid', gap: '10px', maxWidth: '500px' }}>
      {error && <p className="mensaje-error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      <label>Título</label>
      <input name="titulo" value={form.titulo} onChange={cambiar} required />

      <label>ISBN</label>
      <input name="isbn" value={form.isbn} onChange={cambiar} required />

      <label>ID del Autor (Número)</label>
      <input name="idAutor" type="number" min="1" value={form.idAutor} onChange={cambiar} required />

      <label>Categoría</label>
      <select name="idCategoria" value={form.idCategoria} onChange={cambiar} required>
        <option value="">Seleccione...</option>
        {categorias.map((cat, index) => (
          // Usamos el ID real de la categoría para enviarlo a la BD
          <option key={index} value={cat.idCategoria || cat.id}>{cat.nombre || cat}</option>
        ))}
      </select>

      <label>ID de la Editorial (Número)</label>
      <input name="idEditorial" type="number" min="1" value={form.idEditorial} onChange={cambiar} required />

      <label>Stock</label>
      <input name="stock" type="number" min="0" value={form.stock} onChange={cambiar} required />

      <label>Estado</label>
      <select name="estado" value={form.estado} onChange={cambiar}>
        <option value={1}>Disponible</option>
        <option value={0}>Prestado</option>
      </select>

      <button type="submit" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#1f4e3d', color: 'white', border: 'none', cursor: 'pointer' }}>
        {submitText}
      </button>
    </form>
  )
}