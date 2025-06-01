import React from 'react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { CreateUsuario as CreateUsuarioService } from '../Servers/UsuarioServer';

const CreateUsuario = ({ onClose, onSuccess }) => {
  const queryClient = useQueryClient();  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: ''
    }, 
    onSubmit: async ({ value }) => {
      try {
        const currentData = queryClient.getQueryData(['usuarios']);
        
        if (!currentData) {
          throw new Error('No se pudieron obtener los datos actuales de usuarios');
        }
        const usuarios = currentData.usuarios || [];
        let maxId = 0;
        
        if (usuarios.length > 0) {
          usuarios.forEach(u => {
            const numId = parseInt(u.id);
            if (!isNaN(numId) && numId > maxId) {
              maxId = numId;
            }
          });
        }          // No incluimos el ID, ya que el API lo generará automáticamente
          const newUsuario = {
          email: value.email,
          password: value.password,
          role: value.role
        };

        // Enviamos directamente el nuevo usuario sin envolverlo en otra estructura y sin ID
        await CreateUsuarioService(newUsuario);
        await queryClient.invalidateQueries(['usuarios']);

        if (onSuccess) onSuccess();
        if (onClose) onClose();

      } catch (error) {
        console.error('Error al crear usuario:', error);
        form.setFieldValue('submitError', 'No se pudo crear el usuario');
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>

        {form.state.isSubmitting && (
          <div className="text-blue-500 mb-2">Creando...</div>
        )}

        {form.state.submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {form.state.submitError}
          </div>
        )}        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                <input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />
          <form.Field
            name="role"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Role</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
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

export default CreateUsuario;
