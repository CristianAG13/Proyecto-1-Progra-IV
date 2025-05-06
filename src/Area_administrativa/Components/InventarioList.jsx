import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useInventario } from '../Servers/useInventario'

const InventarioList = () => {
    const {data, isLoading, isError, error} = useInventario()

  
    const inventario = useMemo(() => data?.productos ?? [], [data])

    const columns = useMemo(() => [
        {header: 'ID', accessorKey: 'id', },
        {header: 'NOMBRE', accessorKey: 'nombre',},
        {header: 'CANTIDAD', accessorKey: 'cantidad',},
        {header: 'PRECIO', accessorKey: 'precio',},
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
        <h1 className="text-3xl font-bold mb-4">Inventario</h1>
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
      </div>
    );
}

export default InventarioList