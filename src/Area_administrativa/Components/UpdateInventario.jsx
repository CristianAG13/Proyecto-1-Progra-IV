import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { UpdateInventario as UpdateInventarioService } from '../Servers/InventarioService';

const UpdateInventario = ({ producto, onClose, onSuccess }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      id: '',
      nombre: '',
      cantidad: '',
      precio: ''
    },

    onSubmit: async ({ value }) => {
      try {
        const currentData = queryClient.getQueryData(['inventario']);

        const updatedProductos = [...currentData.productos];
        const index = updatedProductos.findIndex(p => p.id === value.id);

        updatedProductos[index] = {
          ...value,
          cantidad: parseFloat(value.cantidad) || 0,
          precio: parseFloat(value.precio) || 0
        };

        const updatedData = {
          ...currentData,
          productos: updatedProductos
        };

        await UpdateInventarioService(updatedData);
        await queryClient.invalidateQueries(['inventario']);

        if (onSuccess) onSuccess();
        if (onClose) onClose();

      } catch (error) {
        console.error('Error al actualizar:', error);
        form.setFieldValue('submitError', 'No se pudo actualizar el producto');
      }
    }
  });

  // Setear datos iniciales al cargar el producto
  useEffect(() => {
    if (producto) {
      form.setFieldValue('id', producto.id || '');
      form.setFieldValue('nombre', producto.nombre || '');
      form.setFieldValue('cantidad', producto.cantidad || '');
      form.setFieldValue('precio', producto.precio || '');
    }
  }, [producto]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Actualizar Producto</h2>

        {form.state.isSubmitting && (
          <div className="text-blue-500 mb-2">Actualizando...</div>
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
        > { }

          { }
          <form.Field
            name="id"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">ID</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>
            )}
          />

          {/* Nombre */}
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

          {/* Cantidad */}
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

          {/* Precio */}
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInventario;
