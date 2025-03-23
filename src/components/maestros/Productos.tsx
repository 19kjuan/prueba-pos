import { useState } from 'react';
import {
  PlusIcon,
  ArrowPathIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface Producto {
  clave: string;
  proveedor: string;
  categoria: string;
  descripcion: string;
  precio: number;
  costo: number;
  stock_actual: number;
  stock_maximo: number;
  stock_minimo: number;
  estado: 'activo' | 'inactivo';
}

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [proveedores] = useState([
    { id: '1', nombre: 'Proveedor 1' },
    { id: '2', nombre: 'Proveedor 2' },
    { id: '3', nombre: 'Proveedor 3' },
  ]);

  const [categorias] = useState([
    { id: '1', nombre: 'Categoría 1' },
    { id: '2', nombre: 'Categoría 2' },
    { id: '3', nombre: 'Categoría 3' },
  ]);

  const [productos, setProductos] = useState<Producto[]>([
    { clave: '000000000', descripcion: 'COMISION PAGO CON TARJETA', proveedor: '', categoria: '', precio: 0, costo: 0, stock_actual: 0, stock_maximo: 999999, stock_minimo: 0, estado: 'activo' },
    { clave: '2', descripcion: 'SAPO', proveedor: '', categoria: '', precio: 0, costo: 0, stock_actual: 248, stock_maximo: 999999, stock_minimo: 0, estado: 'activo' },
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
              if (selectedProducto) {
                setShowModal(true);
              }
            }}
            className={`flex items-center px-3 py-2 ${selectedProducto ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-400 cursor-not-allowed'} text-white rounded transition-colors`}
            disabled={!selectedProducto}
          >
            <ArrowPathIcon className="h-5 w-5 mr-1" />
            Modificar
          </button>
          <button 
            onClick={() => {
              if (selectedProducto) {
                setShowDeleteModal(true);
              }
            }}
            className={`flex items-center px-3 py-2 ${selectedProducto ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 cursor-not-allowed'} text-white rounded transition-colors`}
            disabled={!selectedProducto}
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Buscar por descripción..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Clave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {productos
              .filter(producto =>
                producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((producto) => (
                <tr 
                  key={producto.clave} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${selectedProducto?.clave === producto.clave ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                  onClick={() => setSelectedProducto(producto)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{producto.clave}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{producto.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{producto.stock_actual}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedProducto ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}</h2>
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
              const newErrors: {[key: string]: string} = {};

              // Validaciones
              if (!formData.get('descripcion')) {
                newErrors.descripcion = 'La descripción es requerida';
              }

              const precio = parseFloat(formData.get('precio') as string);
              if (isNaN(precio) || precio < 0) {
                newErrors.precio = 'El precio debe ser un número válido mayor o igual a 0';
              }

              const costo = parseFloat(formData.get('costo') as string);
              if (isNaN(costo) || costo < 0) {
                newErrors.costo = 'El costo debe ser un número válido mayor o igual a 0';
              }

              const stock_actual = parseFloat(formData.get('stock_actual') as string);
              if (isNaN(stock_actual)) {
                newErrors.stock_actual = 'El stock actual debe ser un número válido';
              }

              const stock_maximo = parseFloat(formData.get('stock_maximo') as string);
              if (isNaN(stock_maximo) || stock_maximo < stock_actual) {
                newErrors.stock_maximo = 'El stock máximo debe ser mayor o igual al stock actual';
              }

              const stock_minimo = parseFloat(formData.get('stock_minimo') as string);
              if (isNaN(stock_minimo) || stock_minimo > stock_actual) {
                newErrors.stock_minimo = 'El stock mínimo debe ser menor o igual al stock actual';
              }

              if (Object.keys(newErrors).length > 0) {
                setFormErrors(newErrors);
                return;
              }

              const productoData: Producto = {
                clave: selectedProducto ? selectedProducto.clave : formData.get('clave') as string,
                proveedor: formData.get('proveedor') as string,
                categoria: formData.get('categoria') as string,
                descripcion: formData.get('descripcion') as string,
                precio,
                costo,
                stock_actual,
                stock_maximo,
                stock_minimo,
                estado: 'activo',
              };
              
              if (selectedProducto) {
                setProductos(prev => prev.map(p => p.clave === selectedProducto.clave ? productoData : p));
                setSelectedProducto(null);
              } else {
                setProductos(prev => [...prev, productoData]);
              }
              setFormErrors({});
              setShowModal(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clave</label>
                  <input
                    type="text"
                    name="clave"
                    required
                    defaultValue={selectedProducto?.clave || ''}
                    readOnly={!!selectedProducto}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proveedor</label>
                  <select
                    name="proveedor"
                    defaultValue={selectedProducto?.proveedor || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Seleccione...</option>
                    {proveedores.map(proveedor => (
                      <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                  <select
                    name="categoria"
                    defaultValue={selectedProducto?.categoria || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Seleccione...</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    required
                    defaultValue={selectedProducto?.descripcion || ''}
                    className={`w-full px-3 py-2 border ${formErrors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                  {formErrors.descripcion && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.descripcion}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    step="0.01"
                    required
                    defaultValue={selectedProducto?.precio || 0}
                    className={`w-full px-3 py-2 border ${formErrors.precio ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                  {formErrors.precio && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.precio}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Costo</label>
                  <input
                    type="number"
                    name="costo"
                    step="0.01"
                    required
                    defaultValue={selectedProducto?.costo || 0}
                    className={`w-full px-3 py-2 border ${formErrors.costo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                  {formErrors.costo && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.costo}</p>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">STOCK MÁXIMO Y MÍNIMO</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Actual</label>
                      <input
                        type="number"
                        name="stock_actual"
                        step="1"
                        required
                        defaultValue={selectedProducto?.stock_actual || 0}
                        className={`w-full px-3 py-2 border ${formErrors.stock_actual ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      />
                      {formErrors.stock_actual && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.stock_actual}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Máximo</label>
                      <input
                        type="number"
                        name="stock_maximo"
                        step="1"
                        required
                        defaultValue={selectedProducto?.stock_maximo || 999999}
                        className={`w-full px-3 py-2 border ${formErrors.stock_maximo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      />
                      {formErrors.stock_maximo && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.stock_maximo}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Mínimo</label>
                      <input
                        type="number"
                        name="stock_minimo"
                        step="1"
                        required
                        defaultValue={selectedProducto?.stock_minimo || 0}
                        className={`w-full px-3 py-2 border ${formErrors.stock_minimo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      />
                      {formErrors.stock_minimo && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.stock_minimo}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedProducto ? 'Guardar cambios' : 'Crear producto'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <div className="flex items-center mb-4 text-red-600">
              <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">Confirmar Eliminación</h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              ¿Está seguro que desea eliminar el producto "{selectedProducto?.descripcion}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setProductos(prev => prev.filter(p => p.clave !== selectedProducto?.clave));
                  setSelectedProducto(null);
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;