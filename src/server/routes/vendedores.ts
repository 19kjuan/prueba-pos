import express from 'express';
import pool from '../../config/database';

const router = express.Router();

// Obtener todos los vendedores
router.get('/', async (req, res) => {
  try {
    const [vendedores] = await pool.query(
      'SELECT v.*, c.nombre as ciudad_nombre, d.nombre as departamento_nombre FROM vendedores v LEFT JOIN ciudades c ON v.ciudad = c.id LEFT JOIN departamento d ON v.departamento = d.id'
    );
    res.json(vendedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vendedores' });
  }
});

// Obtener un vendedor por ID
router.get('/:id', async (req, res) => {
  try {
    const [vendedor] = await pool.query('SELECT * FROM vendedores WHERE id = ?', [req.params.id]);
    if (!vendedor[0]) {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }
    res.json(vendedor[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vendedor' });
  }
});

// Crear un nuevo vendedor
router.post('/', async (req, res) => {
  try {
    const { cc, nombre, direccion, ciudad, departamento, tel1, tel2, correo } = req.body;
    const [result] = await pool.query(
      'INSERT INTO vendedores (cc, nombre, direccion, ciudad, departamento, tel1, tel2, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [cc, nombre, direccion, ciudad, departamento, tel1, tel2, correo]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el vendedor' });
  }
});

// Actualizar un vendedor
router.put('/:id', async (req, res) => {
  try {
    const { cc, nombre, direccion, ciudad, departamento, tel1, tel2, correo } = req.body;
    await pool.query(
      'UPDATE vendedores SET cc = ?, nombre = ?, direccion = ?, ciudad = ?, departamento = ?, tel1 = ?, tel2 = ?, correo = ? WHERE id = ?',
      [cc, nombre, direccion, ciudad, departamento, tel1, tel2, correo, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vendedor' });
  }
});

// Eliminar un vendedor
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM vendedores WHERE id = ?', [req.params.id]);
    res.json({ message: 'Vendedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vendedor' });
  }
});

export default router;