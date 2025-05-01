import React from 'react'

const SideBar = () => {

    return (<>
        <div className='flex flex-col w-64 h-screen bg-gray-800 text-white'>
        <div className='flex items-center justify-center h-16 bg-gray-900'>
            <h1 className='text-2xl font-bold'>Inventario</h1>
        </div>
        <nav className='flex flex-col p-4 space-y-2'>
            <a href="#" className='p-2 hover:bg-gray-700 rounded'>Materiales</a>

        </nav>
       
        </div>
      
         </>
    )
}

export default SideBar