import React from 'react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { CreateInventario as CreateInventarioService } from '../Servers/InventarioService';

const CreateInventario = ({ onClose, onSuccess }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      nombre: '',
      cantidad: '',
      precio: ''
    }, 
      onSubmit: async ({ value }) => {
      try {
        const currentData = queryClient.getQueryData(['inventario']);
        
        if (!currentData) {
          throw new Error('No se pudieron obtener los datos actuales del inventario');
        }
        const productos = currentData.productos || [];
        let maxId = 0;
        
        if (productos.length > 0) {
          productos.forEach(p => {
            const numId = parseInt(p.id);
            if (!isNaN(numId) && numId > maxId) {
              maxId = numId;
            }
          });
        }
        
        const newId = (maxId + 1).toString();
        
        const newProducto = {
          id: newId,
          nombre: value.nombre,
          cantidad: parseFloat(value.cantidad) || 0,
          precio: parseFloat(value.precio) || 0
        };

        const updatedData = {
          ...currentData,
          productos: [...productos, newProducto]
        };

        await CreateInventarioService(updatedData);
        await queryClient.invalidateQueries(['inventario']);

        if (onSuccess) onSuccess();
        if (onClose) onClose();

      } catch (error) {
        console.error('Error al crear producto:', error);
        form.setFieldValue('submitError', 'No se pudo crear el producto');
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>

        {form.state.isSubmitting && (
          <div className="text-blue-500 mb-2">Creando...</div>
        )}

        {form.state.submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {form.state.submitError}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="nombre"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Nombre</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />

          <form.Field
            name="cantidad"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Cantidad</label>
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  min="0"
                  step="1"
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />
          <form.Field
            name="precio"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Precio</label>
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              disabled={form.state.isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={form.state.isSubmitting}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventario;