import express from 'express';
import cors from 'cors';
import pool from '../config/database';
import productosRouter from './routes/productos';
import clientesRouter from './routes/clientes';
import vendedoresRouter from './routes/vendedores';
import ventasRouter from './routes/ventas';
import notasVentaRouter from './routes/notas_venta';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/vendedores', vendedoresRouter);
app.use('/api/ventas', ventasRouter);
app.use('/api/notas-venta', notasVentaRouter);

// Ruta de prueba
app.get('/api/test', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1 as test');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});