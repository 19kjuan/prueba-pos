import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UsersIcon,
  ShoppingBagIcon,
  TruckIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserGroupIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen, darkMode, setDarkMode }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'maestros',
      name: 'Maestros',
      icon: UsersIcon,
      submenu: [
        { id: 'clientes', name: 'Clientes', icon: UserGroupIcon, path: '/maestros/clientes' },
        { id: 'productos', name: 'Productos', icon: ShoppingBagIcon, path: '/maestros/productos' },
        { id: 'proveedores', name: 'Proveedores', icon: TruckIcon, path: '/maestros/proveedores' },
        { id: 'vendedores', name: 'Vendedores', icon: UsersIcon, path: '/maestros/vendedores' },
      ]
    },
    {
      id: 'procesos',
      name: 'Procesos',
      icon: CalculatorIcon,
      submenu: [
        { id: 'ventas', name: 'Ventas', icon: ChartBarIcon, path: '/procesos/ventas' },
        { id: 'clientes', name: 'Clientes', icon: UserGroupIcon, path: '/procesos/clientes' },
        { id: 'inventario', name: 'Inventario', icon: ClipboardDocumentListIcon, path: '/procesos/inventario' },
      ]
    },
    {
      id: 'reportes',
      name: 'Reportes',
      icon: ChartBarIcon,
      submenu: [
        { id: 'ventas', name: 'Ventas', icon: ChartBarIcon, path: '/reportes/ventas' },
        { id: 'clientes', name: 'Clientes', icon: UserGroupIcon, path: '/reportes/clientes' },
        { id: 'inventario', name: 'Inventario', icon: ClipboardDocumentListIcon, path: '/reportes/inventario' },
      ]
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full w-64 py-8 px-4">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-2xl font-bold text-primary">PharmaPos</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus.includes(item.id);
              
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    className={`sidebar-link group w-full flex justify-between items-center ${activeItem === item.id ? 'bg-primary/10 text-primary' : ''}`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <div className="flex items-center">
                      <Icon className="sidebar-icon" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                    />
                  </button>
                  
                  {isExpanded && item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={`${item.id}-${subItem.id}`}
                            to={subItem.path}
                            className={`sidebar-link group pl-6 ${activeItem === `${item.id}-${subItem.id}` ? 'bg-primary/10 text-primary' : ''}`}
                            onClick={() => {
                              setActiveItem(`${item.id}-${subItem.id}`);
                              setIsOpen(false);
                            }}
                          >
                            <SubIcon className="sidebar-icon" />
                            <span>{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="sidebar-link group w-full"
            >
              <svg
                className="h-6 w-6 text-gray-500 group-hover:text-primary transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {darkMode ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
              <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
            <Link
              to="/configuracion"
              className="sidebar-link group"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="sidebar-icon" />
              <span>Configuración</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;