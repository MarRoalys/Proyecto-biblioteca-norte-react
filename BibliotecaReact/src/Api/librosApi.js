import api from './api' // instancia de Axios con el interceptor 

// Obtener todos los libros
export const getLibros = async () => {
  const response = await api.get('/api/Libros')
  return response.data
}

// Obtener un libro por ID (para cuando vayamos a editar)
export const getLibroById = async (id) => {
  const response = await api.get(`/api/Libros/${id}`)
  return response.data
}

// Crear un libro nuevo
export const createLibro = async (libro) => {
  const response = await api.post('/api/Libros', libro)
  return response.data
}

// Actualizar un libro existente
export const updateLibro = async (id, libro) => {
  await api.put(`/api/Libros/${id}`, libro)
}

// Eliminar un libro
export const deleteLibro = async (id) => {
  await api.delete(`/api/Libros/${id}`)
}