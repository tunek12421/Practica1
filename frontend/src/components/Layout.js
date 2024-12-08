import React from 'react';
import { Outlet } from 'react-router-dom';


import Sidebar from './sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar fijo */}
            <Sidebar />

            {/* Contenido principal al lado derecho */}
            <div className="flex flex-col flex-grow ml-64">
                <main className="flex-grow  p-6">
                    <Outlet /> {/* Renderiza la página actual */}
                </main>
        
            </div>
        </div>
    );
};

export default Layout;
