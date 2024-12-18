import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiLayers,
  FiLogOut,
  FiDollarSign,
  FiFileText,
  FiClipboard,
  FiUserCheck,
} from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai"; // Nuevo icono para cerrar sesión colapsado

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!auth || !auth.user) {
    return null; // No renderiza el sidebar si el usuario no está autenticado
  }

  const { rol } = auth.user;

  const handleLogout = () => {
    logout(); // Elimina el token y limpia el contexto
    navigate("/"); // Redirige a la página de inicio de sesión
  };

  return (
    <aside
      onMouseEnter={() => setIsCollapsed(false)} // Expandir al pasar el mouse
      onMouseLeave={() => setIsCollapsed(true)} // Colapsar al quitar el mouse
      className={`h-screen bg-gray-700 text-white shadow-md fixed transition-all duration-300 ease-in-out
                ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex flex-col h-full">
        {/* Título */}
        <div
          className={`px-6 py-4 text-2xl font-bold border-b border-blue-500 whitespace-nowrap overflow-hidden 
                        ${
                          isCollapsed ? "opacity-100" : "opacity-100"
                        } transition-opacity duration-300 ease-in-out text-center`}
        >
          <Link
            to="/dashboard"
            className="hover:text-blue-300 flex justify-center"
          >
            {isCollapsed ? "GE" : "Gestión Empresarial"}
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-4 space-y-8">
          {/* Productos */}
          <div className="flex items-center space-x-4">
            <Link
              to="/productos"
              className="flex items-center space-x-4 hover:text-blue-300"
            >
              <FiBox size={25} />
              <span
                className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                  isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                Productos
              </span>
            </Link>
          </div>

          {/* Categorías */}
          {["Administrador", "Gerente"].includes(rol) && (
            <div className="flex items-center space-x-4">
              <Link
                to="/categorias"
                className="flex items-center space-x-4 hover:text-blue-300"
              >
                <FiLayers size={25} />
                <span
                  className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Categorías
                </span>
              </Link>
            </div>
          )}

          {/* Clientes */}
          <div className="flex items-center space-x-4">
            <Link
              to="/clientes"
              className="flex items-center space-x-4 hover:text-blue-300"
            >
              <FiUsers size={25} />
              <span
                className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                  isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                Clientes
              </span>
            </Link>
          </div>

          {/* Ventas */}
          <div className="flex items-center space-x-4">
            <Link
              to="/ventas"
              className="flex items-center space-x-4 hover:text-blue-300"
            >
              <FiShoppingCart size={25} />
              <span
                className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                  isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                Ventas
              </span>
            </Link>
          </div>

          {/* Pagos */}
          {["Administrador", "Gerente"].includes(rol) && (
            <div className="flex items-center space-x-4">
              <Link
                to="/modopago"
                className="flex items-center space-x-4 hover:text-blue-300"
              >
                <FiDollarSign size={25} />
                <span
                  className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Pagos
                </span>
              </Link>
            </div>
          )}

          {/* Facturas */}
          {["Administrador", "Gerente"].includes(rol) && (
            <div className="flex items-center space-x-4">
              <Link
                to="/facturas"
                className="flex items-center space-x-4 hover:text-blue-300"
              >
                <FiFileText size={25} />
                <span
                  className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Facturas
                </span>
              </Link>
            </div>
          )}

          {/* Detalles */}
          {["Administrador", "Gerente"].includes(rol) && (
            <div className="flex items-center space-x-4">
              <Link
                to="/detalles"
                className="flex items-center space-x-4 hover:text-blue-300"
              >
                <FiClipboard size={25} />
                <span
                  className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Detalles
                </span>
              </Link>
            </div>
          )}

          {/* Usuarios */}
          {["Administrador", "Gerente"].includes(rol) && (
            <div className="flex items-center space-x-4">
              <Link
                to="/usuarios"
                className="flex items-center space-x-4 hover:text-blue-300"
              >
                <FiUserCheck size={25} />
                <span
                  className={`transition-opacity hover:translate-x-px duration-300 ease-in-out ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Usuarios
                </span>
              </Link>
            </div>
          )}
        </nav>

        {/* Botón de Cerrar Sesión */}
        <div className="px-6 py-4 border-t border-blue-500 flex items-center justify-center">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            {isCollapsed ? (
              <AiOutlineLogout size={25} />
            ) : (
              <FiLogOut size={25} />
            )}
            {!isCollapsed && (
              <span className="transition-opacity duration-300 ease-in-out opacity-100 ml-2">
                Cerrar Sesión
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
