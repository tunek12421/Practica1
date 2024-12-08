import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-100 py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                © 2024 <span className="font-bold text-yellow-500">Gestión Empresarial</span>. Todos los derechos reservados.
                </p>
                <div className="mt-2 space-x-4">
                <a href="#privacy" className="hover:underline">Política de Privacidad</a>
                <a href="#terms" className="hover:underline">Términos y Condiciones</a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;

