import React from 'react'
import { useRef } from 'react'
import Swal from 'sweetalert2'
import { Input } from '@/components/ui/input'   
import { Button } from '@/components/ui/button'

const ForgotPasswordForm = () => {
    const emailRef = useRef(null)

const HandleResetPassword = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value

    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Espcacio requerido',
            text: 'Todos los campos son requeridos!',
        })
        return
    }
    Swal.fire({
        icon: 'success',
        title: 'Correo enviado!',
        text: 'Tu correo ha sido enviado!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    })
    }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">   
       <form onSubmit={HandleResetPassword} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-80">
         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
           Recuperar contraseña
         </h2>
 
         <div className="space-y-4">
           <Input
             type="email"
             placeholder="Correo electrónico"
             ref={emailRef}
             autoComplete="email"
           />
           <Button type="submit" className="w-full">
             Enviar enlace
           </Button>
         </div>
       </form>
       
     </div>
     
    </>
  )
}

export default ForgotPasswordForm