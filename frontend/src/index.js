import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes'; // Cambiado de App a AppRoutes
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider para manejar la autenticación

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Envuelve toda la aplicación con el AuthProvider */}
      <AppRoutes /> {/* Cambiado para usar las rutas configuradas */}
    </AuthProvider>
  </React.StrictMode>
);

// Medición de rendimiento (opcional)
reportWebVitals();
