import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { useInventario } from '../Servers/InventarioService'
import UpdateInventario from './UpdateInventario'

const InventarioList = () => {
    const {data, isLoading, isError, error} = useInventario()
    const [selectedProducto, setSelectedProducto] = useState(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  
    const inventario = useMemo(() => data?.productos ?? [], [data])

    const handleUpdateClick = (producto) => {
        setSelectedProducto(producto)
        setIsUpdateModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsUpdateModalOpen(false)
        setSelectedProducto(null)
    }

    const handleUpdateSuccess = () => {
        // Mostrar un mensaje de éxito si lo deseas
        console.log('Producto actualizado correctamente')
    }

    const columns = useMemo(() => [
        {header: 'ID', accessorKey: 'id', },
        {header: 'NOMBRE', accessorKey: 'nombre',},
        {header: 'CANTIDAD', accessorKey: 'cantidad',},
        {header: 'PRECIO', accessorKey: 'precio',},
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
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Eliminar
                    </button>
                </div>
            )
        }
    ],[])

    const table = useReactTable({
        data: inventario, 
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    
    if (isLoading) return <div className='p-4'>Cargando...</div>
    if (isError) return <div className='p-4 text-red-600'>Error: {error.message}</div>



    return (
        <div className="p-4 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Inventario</h1>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Crear Nuevo Producto
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

        {isUpdateModalOpen && selectedProducto && (
          <UpdateInventario 
            producto={selectedProducto}
            onClose={handleCloseModal}
            onSuccess={handleUpdateSuccess}
          />
        )}
        
      </div>
    );
}

export default InventarioList