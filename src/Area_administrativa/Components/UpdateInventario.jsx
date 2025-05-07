import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { UpdateInventario as UpdateInventarioService } from '../Servers/InventarioService';

const UpdateInventario = ({ producto, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    cantidad: '',
    precio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (producto) {
      setFormData({
        id: producto.id || '',
        nombre: producto.nombre || '',
        cantidad: producto.cantidad || '',
        precio: producto.precio || ''
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cantidad' || name === 'precio' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Obtener el inventario actual del cache de React Query
      const currentData = queryClient.getQueryData(['inventario']);
      
      if (!currentData || !currentData.productos) {
        throw new Error('No se pudo obtener los datos actuales del inventario');
      }
      
      // Encontrar el índice del producto a actualizar
      const productoIndex = currentData.productos.findIndex(p => p.id === formData.id);
      
      if (productoIndex === -1) {
        throw new Error('No se encontró el producto en el inventario');
      }
      
      // Actualizar el producto en la lista
      const updatedProductos = [...currentData.productos];
      updatedProductos[productoIndex] = formData;
      
      // Preparar datos para actualizar
      const updatedData = {
        ...currentData,
        productos: updatedProductos
      };
      
      // Usar la función de servicio para actualizar el inventario
      await UpdateInventarioService(updatedData);
      
      // Invalidar la caché para recargar los datos
      queryClient.invalidateQueries(['inventario']);
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      setError(err.message || 'Error al actualizar el producto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Actualizar Producto</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cantidad
            </label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              min="0"
              step="1"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInventario;