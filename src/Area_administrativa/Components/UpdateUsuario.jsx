import React, { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { UpdateUsuario as UpdateUsuarioService } from '../Servers/UsuarioServer';

const UpdateUsuario = ({ usuario, onClose, onSuccess }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      id: '',
      email: '',
      password: '',
      role: ''
    },
    onSubmit: async ({ value }) => {
      try {
        const currentData = queryClient.getQueryData(['usuarios']);
        
        if (!currentData || !currentData.usuarios) {
          throw new Error('No se pudieron obtener los datos actuales de usuarios');
        }        const updatedUsuarios = [...currentData.usuarios];
        const index = updatedUsuarios.findIndex(u => u.id === parseInt(value.id));
        
        if (index === -1) {
          throw new Error('No se encontró el usuario para actualizar');
        }        // ID para la URL y para el objeto (debe ser el mismo según backend)
        // Aseguramos que el ID sea un número
        const userId = parseInt(value.id);
        
        // Creamos un objeto con los campos que el API espera
        const userToUpdate = {
          email: value.email,
          password: value.password,
          role: value.role
        };

        console.log("Enviando actualización para usuario ID:", userId);
        
        // Enviamos el usuario actualizado con los campos necesarios
        await UpdateUsuarioService({
          data: userToUpdate,
          id: userId
        });
        await queryClient.invalidateQueries(['usuarios']);

        if (onSuccess) onSuccess();
        if (onClose) onClose();

      } catch (error) {
        console.error('Error al actualizar:', error);
        form.setFieldValue('submitError', 'No se pudo actualizar el usuario');
      }
    }
  });
  // Setear datos iniciales al cargar el usuario
  useEffect(() => {
    if (usuario) {
      form.setFieldValue('id', usuario.id || '');
      form.setFieldValue('email', usuario.email || '');
      form.setFieldValue('password', usuario.password || '');
      form.setFieldValue('role', usuario.role || '');
    }
  }, [usuario, form]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Actualizar Usuario</h2>

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
        >
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

          {/* Email */}
          <form.Field
            name="email"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />

          {/* PASS */}
          <form.Field
            name="password"
            children={(field) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            )}
          />          {/* Role */}
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsuario;
