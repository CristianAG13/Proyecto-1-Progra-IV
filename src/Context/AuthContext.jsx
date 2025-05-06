

// 1. Create a new context
import { createContext } from 'react'
import { useState } from 'react'

export const AuthContext = createContext()

// 2. Create a Provider para compartir el estado del usuario
export const AuthProvider = ({children}) => {

    const [inventario, setInventario] = useState(null)

    return (
        <AuthContext.Provider value={{ inventario, setInventario}}>
            {children}
        </AuthContext.Provider>
    )
}