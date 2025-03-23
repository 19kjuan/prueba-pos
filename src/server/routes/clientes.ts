import express from 'express';
import pool from '../../config/database';

const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const [clientes] = await pool.query(
      'SELECT c.*, ci.nombre as ciudad_nombre, d.nombre as departamento_nombre FROM cliente c LEFT JOIN ciudades ci ON c.ciudad = ci.id LEFT JOIN departamento d ON c.departamento = d.id'
    );
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const [cliente] = await pool.query('SELECT * FROM cliente WHERE id = ?', [req.params.id]);
    if (!cliente[0]) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const { nombre, cc, direccion, ciudad, departamento, tel1, tel2, correo } = req.body;
    const [result] = await pool.query(
      'INSERT INTO cliente (nombre, cc, direccion, ciudad, departamento, tel1, tel2, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, cc, direccion, ciudad, departamento, tel1, tel2, correo]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const { nombre, cc, direccion, ciudad, departamento, tel1, tel2, correo } = req.body;
    await pool.query(
      'UPDATE cliente SET nombre = ?, cc = ?, direccion = ?, ciudad = ?, departamento = ?, tel1 = ?, tel2 = ?, correo = ? WHERE id = ?',
      [nombre, cc, direccion, ciudad, departamento, tel1, tel2, correo, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM cliente WHERE id = ?', [req.params.id]);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});

export default router;