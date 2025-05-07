import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
const Welcome = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className={`text-center transform transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-6 relative">
          <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-30 rounded-full"></span>
          <h1 className="relative text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
            ¡Bienvenido!
          </h1>
        </div>
        
        <p className={`text-2xl text-gray-600 mb-8 transform transition-all delay-300 duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Nos alegra verte de nuevo
        </p>
        
        <div className={`inline-block transform transition-all delay-500 duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Link to="/admin/inventario"> Comenzar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;