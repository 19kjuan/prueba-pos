import express from 'express';
import pool from '../../config/database';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query(
      'SELECT p.*, cp.nombre as categoria, pr.nombre as proveedor FROM productos p LEFT JOIN clasificacion_producto cp ON p.id_clasificacion = cp.id LEFT JOIN proveedores pr ON p.id_proveedor = pr.id'
    );
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (!producto[0]) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, unidad_medida, precio, costo, servicio, stock_max, stock_minimo, id_clasificacion, id_proveedor } = req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, unidad_medida, precio, costo, servicio, stock_max, stock_minimo, id_clasificacion, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, unidad_medida, precio, costo, servicio, stock_max, stock_minimo, id_clasificacion, id_proveedor]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, unidad_medida, precio, costo, servicio, stock_max, stock_minimo, id_clasificacion, id_proveedor } = req.body;
    await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, unidad_medida = ?, precio = ?, costo = ?, servicio = ?, stock_max = ?, stock_minimo = ?, id_clasificacion = ?, id_proveedor = ? WHERE id = ?',
      [nombre, descripcion, unidad_medida, precio, costo, servicio, stock_max, stock_minimo, id_clasificacion, id_proveedor, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;