import express from 'express';
import pool from '../../config/database';

const router = express.Router();

// Obtener todas las notas de venta
router.get('/', async (req, res) => {
  try {
    const [notas] = await pool.query(
      'SELECT n.*, c.nombre as cliente_nombre, v.nombre as vendedor_nombre FROM notas_venta n LEFT JOIN cliente c ON n.id_cliente = c.id LEFT JOIN vendedores v ON n.id_vendedor = v.id'
    );
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener notas de venta' });
  }
});

// Obtener una nota de venta por ID con sus detalles
router.get('/:id', async (req, res) => {
  try {
    const [nota] = await pool.query('SELECT * FROM notas_venta WHERE id = ?', [req.params.id]);
    if (!nota[0]) {
      return res.status(404).json({ error: 'Nota de venta no encontrada' });
    }
    
    const [detalles] = await pool.query(
      'SELECT d.*, p.nombre as producto_nombre FROM detalle_nota_venta d LEFT JOIN productos p ON d.id_producto = p.id WHERE d.id_nota = ?',
      [req.params.id]
    );
    
    const [pagos] = await pool.query(
      'SELECT p.*, fp.nombre as forma_pago_nombre FROM pagos_nota p LEFT JOIN forma_pago fp ON p.id_forma_pago = fp.id WHERE p.id_nota = ?',
      [req.params.id]
    );
    
    res.json({ ...nota[0], detalles, pagos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la nota de venta' });
  }
});

// Crear una nueva nota de venta
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { id_cliente, id_vendedor, subtotal, total, detalles, pagos } = req.body;
    
    // Generar folio único
    const [maxFolio] = await connection.query('SELECT MAX(CAST(folio AS UNSIGNED)) as max_folio FROM notas_venta');
    const nuevoFolio = String(Number(maxFolio[0].max_folio || 0) + 1).padStart(8, '0');
    
    // Insertar la nota de venta
    const [notaResult] = await connection.query(
      'INSERT INTO notas_venta (folio, id_cliente, id_vendedor, subtotal, total) VALUES (?, ?, ?, ?, ?)',
      [nuevoFolio, id_cliente, id_vendedor, subtotal, total]
    );
    
    // Insertar los detalles de la nota
    for (const detalle of detalles) {
      await connection.query(
        'INSERT INTO detalle_nota_venta (id_nota, id_producto, cantidad, precio_unitario, importe) VALUES (?, ?, ?, ?, ?)',
        [notaResult.insertId, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, detalle.importe]
      );
    }
    
    // Insertar los pagos de la nota
    for (const pago of pagos) {
      await connection.query(
        'INSERT INTO pagos_nota (id_nota, id_forma_pago, monto) VALUES (?, ?, ?)',
        [notaResult.insertId, pago.id_forma_pago, pago.monto]
      );
    }
    
    await connection.commit();
    res.status(201).json({ id: notaResult.insertId, folio: nuevoFolio, ...req.body });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Error al crear la nota de venta' });
  } finally {
    connection.release();
  }
});

// Actualizar estado de una nota de venta
router.patch('/:id/estado', async (req, res) => {
  try {
    const { estado } = req.body;
    await pool.query(
      'UPDATE notas_venta SET estado = ? WHERE id = ?',
      [estado, req.params.id]
    );
    res.json({ id: req.params.id, estado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado de la nota de venta' });
  }
});

// Cancelar una nota de venta
router.delete('/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    // Eliminar los pagos de la nota
    await connection.query('DELETE FROM pagos_nota WHERE id_nota = ?', [req.params.id]);
    
    // Eliminar los detalles de la nota
    await connection.query('DELETE FROM detalle_nota_venta WHERE id_nota = ?', [req.params.id]);
    
    // Actualizar estado de la nota a CANCELADA
    await connection.query('UPDATE notas_venta SET estado = ? WHERE id = ?', ['CANCELADA', req.params.id]);
    
    await connection.commit();
    res.json({ message: 'Nota de venta cancelada correctamente' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Error al cancelar la nota de venta' });
  } finally {
    connection.release();
  }
});

export default router;