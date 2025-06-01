import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteUsuario as DeleteUsuarioService } from '../Servers/UsuarioServer';

const DeleteUsuario = ({ usuario, onClose, onSuccess }) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      
      const currentData = queryClient.getQueryData(['usuarios']);
      
      if (!currentData || !currentData.usuarios) {
        throw new Error('No se pudieron obtener los datos actuales de usuarios');
      }
      await DeleteUsuarioService(usuario.id);
      
      await queryClient.invalidateQueries(['usuarios']);
      
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError('No se pudo eliminar el usuario');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
          <p className="mb-4">
          ¿Está seguro que desea eliminar el usuario <span className="font-semibold">{usuario?.email}</span>?
        </p>
        
        {isDeleting && (
          <div className="text-blue-500 mb-2">Eliminando...</div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={isDeleting}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsuario;
