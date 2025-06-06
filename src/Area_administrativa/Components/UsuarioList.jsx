import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useUsuarios } from '../Servers/UsuarioServer'
import UpdateUsuario from './UpdateUsuario'
import CreateUsuario from './CreateUsuario'
import DeleteUsuario from './DeleteUsuario'

const UsuarioList = () => {
    const {data, isLoading, isError, error} = useUsuarios()
    const [selectedUsuario, setSelectedUsuario] = useState(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
    const usuarios = useMemo(() => data?.usuarios ?? [], [data])

    const handleUpdateClick = (usuario) => {
        setSelectedUsuario(usuario)
        setIsUpdateModalOpen(true)
    }

    const handleCreateClick = () => {
        setIsCreateModalOpen(true)
    }

    const handleDeleteClick = (usuario) => {
        setSelectedUsuario(usuario)
        setIsDeleteModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsUpdateModalOpen(false)
        setIsCreateModalOpen(false)
        setIsDeleteModalOpen(false)
        setSelectedUsuario(null)
    }

    const handleUpdateSuccess = () => {
        console.log('Usuario actualizado correctamente')
    }  
      const handleCreateSuccess = () => {
        console.log('Usuario creado correctamente')
    }
    
    const handleDeleteSuccess = () => {
        console.log('Usuario eliminado correctamente')
    }

    const columns = useMemo(() => [
        {
            header: '#', 
            id: 'index',
            cell: ({row}) => row.index + 1
        },
        {header: 'Email', accessorKey: 'email',},
        {header: 'Role', accessorKey: 'role',},
        {
            header: 'ACCIONES',
            id: 'acciones',
            cell: ({row}) => (
                <div className="flex space-x-2">
                    <button 
                        onClick={() => handleUpdateClick(row.original)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Actualizar
                    </button>
                    <button 
                        onClick={() => handleDeleteClick(row.original)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Eliminar
                    </button>
                </div>
            )
        }
    ],[])

    const table = useReactTable({
        data: usuarios, 
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    
    if (isLoading) return <div className='p-4'>Cargando...</div>
    if (isError) return <div className='p-4 text-red-600'>Error: {error.message}</div>

    return (
        <div className="p-4 bg-gray-100 min-h-screen">        
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Usuarios</h1>
                <button 
                    onClick={handleCreateClick}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear Nuevo Usuario
                </button>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                        No hay datos disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>        
            {isUpdateModalOpen && selectedUsuario && (
              <UpdateUsuario 
                usuario={selectedUsuario}
                onClose={handleCloseModal}
                onSuccess={handleUpdateSuccess}
              />
            )}
            
            {isCreateModalOpen && (
              <CreateUsuario
                onClose={handleCloseModal}
                onSuccess={handleCreateSuccess}
              />
            )}

            {isDeleteModalOpen && selectedUsuario && (
              <DeleteUsuario
                usuario={selectedUsuario}
                onClose={handleCloseModal}
                onSuccess={handleDeleteSuccess}
              />
            )}
        </div>
    );
}

export default UsuarioList
