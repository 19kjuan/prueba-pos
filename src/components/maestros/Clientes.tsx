import { useState } from 'react';
import {
  PlusIcon,
  ArrowPathIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Cliente {
  clave: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
  rfc: string;
}

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([    
    { clave: '1', nombre: 'PUBLICO EN GENERAL', apellido: '', email: 'publico@general.com', telefono: '0000000000', estado: 'activo', rfc: '' },
    { clave: '2', nombre: 'JUAN', apellido: 'PEREZ', email: 'juan@example.com', telefono: '1234567890', estado: 'activo', rfc: 'ABCD123456' },

  ]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Nuevo
          </button>
          <button 
            onClick={() => {
              if (selectedCliente) {
                setShowModal(true);
              }
            }}
            className={`flex items-center px-3 py-2 ${selectedCliente ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-400 cursor-not-allowed'} text-white rounded transition-colors`}
            disabled={!selectedCliente}
          >
            <ArrowPathIcon className="h-5 w-5 mr-1" />
            Modificar
          </button>
          <button 
            onClick={() => {
              if (selectedCliente) {
                setClientes(prev => prev.filter(c => c.clave !== selectedCliente.clave));
                setSelectedCliente(null);
              }
            }}
            className={`flex items-center px-3 py-2 ${selectedCliente ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 cursor-not-allowed'} text-white rounded transition-colors`}
            disabled={!selectedCliente}
          >
            <TrashIcon className="h-5 w-5 mr-1" />
            Eliminar
          </button>
          <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
            Importar
          </button>
          <button className="flex items-center px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            <ArrowUpTrayIcon className="h-5 w-5 mr-1" />
            Exportar
          </button>
        </div>
        <div className="text-right text-gray-500 dark:text-gray-400">
          Status
          <div className="font-medium">-------------</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Buscar por nombre..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Clave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {clientes
              .filter(cliente =>
                cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((cliente) => (
                <tr 
                  key={cliente.clave} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${selectedCliente?.clave === cliente.clave ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                  onClick={() => setSelectedCliente(cliente)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{cliente.clave}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{cliente.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{cliente.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{cliente.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    <span className={`px-2 py-1 rounded-full text-xs ${cliente.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {cliente.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <ArrowPathIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedCliente ? 'EDITAR CLIENTE' : 'NUEVO CLIENTE'}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const clienteData: Cliente = {
                clave: formData.get('id') as string,
                nombre: formData.get('nombre') as string,
                apellido: formData.get('apellido') as string,
                email: formData.get('email') as string,
                telefono: formData.get('telefono') as string,
                estado: 'activo',
                rfc: formData.get('rfc') as string,
              };
              
              if (selectedCliente) {
                setClientes(prev => prev.map(c => c.clave === selectedCliente.clave ? clienteData : c));
                setSelectedCliente(null);
              } else {
                setClientes(prev => [...prev, clienteData]);
              }
              setShowModal(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    defaultValue={selectedCliente?.nombre || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    required
                    defaultValue={selectedCliente?.apellido || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</label>
                  <input
                    type="text"
                    name="id"
                    required
                    defaultValue={selectedCliente?.clave || ''}
                    readOnly={!!selectedCliente}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">RFC</label>
                  <input
                    type="text"
                    name="rfc"
                    defaultValue={selectedCliente?.rfc || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    defaultValue={selectedCliente?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                  <input
                    type="text"
                    value="Activo"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;