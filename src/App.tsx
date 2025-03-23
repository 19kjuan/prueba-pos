import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clientes from './components/maestros/Clientes';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Rutas de Maestros */}
            <Route path="/maestros/clientes" element={<Clientes />} />
            <Route path="/maestros/productos" element={<div className="p-6">Productos</div>} />
            <Route path="/maestros/proveedores" element={<div className="p-6">Proveedores</div>} />
            <Route path="/maestros/vendedores" element={<div className="p-6">Vendedores</div>} />
            {/* Rutas de Procesos */}
            <Route path="/procesos/ventas" element={<div className="p-6">Ventas</div>} />
            <Route path="/procesos/clientes" element={<div className="p-6">Clientes</div>} />
            <Route path="/procesos/inventario" element={<div className="p-6">Inventario</div>} />
            {/* Rutas de Reportes */}
            <Route path="/reportes/ventas" element={<div className="p-6">Reportes de Ventas</div>} />
            <Route path="/reportes/clientes" element={<div className="p-6">Reportes de Clientes</div>} />
            <Route path="/reportes/inventario" element={<div className="p-6">Reportes de Inventario</div>} />
            <Route path="/configuracion" element={<div className="p-6">Configuración</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;