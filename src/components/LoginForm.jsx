import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from "@tanstack/react-router";
import { login } from '../services/LoginService'


const LoginForm = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [remenber, setRemenber] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Espacio requerido',
                text: 'Todos los campos son requeridos!',
            });
            return;
        }
        console.log('Payload enviado:', {
            email,
            password
        });
        setLoading(true);

        try {
            const result = await login(email, password);
            console.log("Respuesta recibida:", result);
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Bienvenido al sistema',
            }).then(() => {
                window.location.href ='/admin/welcome';
            });

        } catch (error) {
            console.error('Error de inicio de sesión:', error);

            const errorMessage =
                error.response?.data?.message || 'Credenciales incorrectas. Intenta nuevamente.';

            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-100">
                <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center'> Inicio de Seccion </h2>
                <div className='space-y-4'>
                    <Input
                        type="text"
                        placeholder="Correo electronico"
                        ref={emailRef}
                        autoComplete="email"
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        ref={passwordRef}
                        autoComplete="new-password"
                    />

                    <div className='flex items-center justify-between'>
                        <label className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                            <input
                                type="checkbox"
                                checked={remenber}
                                onChange={(e) => setRemenber(e.target.checked)}
                            />
                            <span>Recuerdame</span>
                        </label>
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <Button type="submit" disabled={loading} className='w-full mt-4'>{loading ? 'Iniciando sesion...' : 'Iniciar sesion'}
                    </Button>
                </div>

            </form>
        </>
    )
}


export default LoginForm