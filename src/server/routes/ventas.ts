import express from 'express';
import pool from '../../config/database';

const router = express.Router();

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const [ventas] = await pool.query(
      'SELECT v.*, c.nombre as cliente_nombre, ve.nombre as vendedor_nombre FROM venta v LEFT JOIN cliente c ON v.id_cliente = c.id LEFT JOIN vendedores ve ON v.id_vendedor = ve.id'
    );
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Obtener una venta por ID con sus detalles
router.get('/:id', async (req, res) => {
  try {
    const [venta] = await pool.query('SELECT * FROM venta WHERE id = ?', [req.params.id]);
    if (!venta[0]) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    
    const [detalles] = await pool.query(
      'SELECT d.*, p.nombre as producto_nombre FROM detalle_venta d LEFT JOIN productos p ON d.id_producto = p.id WHERE d.id_venta = ?',
      [req.params.id]
    );
    
    res.json({ ...venta[0], detalles });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la venta' });
  }
});

// Crear una nueva venta
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { id_cliente, id_vendedor, subtotal, iva, total, detalles } = req.body;
    
    // Insertar la venta
    const [ventaResult] = await connection.query(
      'INSERT INTO venta (folio, id_cliente, id_vendedor, subtotal, iva, total) VALUES ((SELECT COALESCE(MAX(folio), 0) + 1 FROM venta v2), ?, ?, ?, ?, ?)',
      [id_cliente, id_vendedor, subtotal, iva, total]
    );
    
    // Insertar los detalles de la venta
    for (const detalle of detalles) {
      await connection.query(
        'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, importe) VALUES (?, ?, ?, ?, ?)',
        [ventaResult.insertId, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, detalle.importe]
      );
    }
    
    await connection.commit();
    res.status(201).json({ id: ventaResult.insertId, folio: ventaResult.insertId, ...req.body });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Error al crear la venta' });
  } finally {
    connection.release();
  }
});

// Cancelar una venta
router.delete('/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    // Eliminar los detalles de la venta
    await connection.query('DELETE FROM detalle_venta WHERE id_venta = ?', [req.params.id]);
    
    // Eliminar la venta
    await connection.query('DELETE FROM venta WHERE id = ?', [req.params.id]);
    
    await connection.commit();
    res.json({ message: 'Venta cancelada correctamente' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Error al cancelar la venta' });
  } finally {
    connection.release();
  }
});

export default router;