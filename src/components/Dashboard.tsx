import { Card, Title, BarChart, LineChart, Text, Grid, Col, Metric } from '@tremor/react';
import { CurrencyDollarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface VentasData {
  month: string;
  ventas: number;
}

interface InventoryData {
  month: string;
  existencias: number;
}

const chartdata: VentasData[] = [
  { month: 'Enero', ventas: 2890 },
  { month: 'Febrero', ventas: 3890 },
  { month: 'Marzo', ventas: 2390 },
  { month: 'Abril', ventas: 2190 },
  { month: 'Mayo', ventas: 1890 },
  { month: 'Junio', ventas: 1690 },
];

const inventoryData: InventoryData[] = [
  { month: 'Enero', existencias: 320 },
  { month: 'Febrero', existencias: 350 },
  { month: 'Marzo', existencias: 410 },
  { month: 'Abril', existencias: 480 },
  { month: 'Mayo', existencias: 470 },
  { month: 'Junio', existencias: 500 },
];

const productosAgotados = [
  { id: 1, nombre: 'Dolex Gripa', precio: '$5.00', imagen: '🌡️' },
  { id: 2, nombre: 'Meloxicam', precio: '$7.00', imagen: '💊' },
  { id: 3, nombre: 'DiclofenacoGEL', precio: '$23.00', imagen: '🧴' },
  { id: 4, nombre: 'Cinta Kinesiológica', precio: '$18.00', imagen: '🩹' },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <Text>Ventas del día</Text>
                <Metric>$1,429.00</Metric>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <Text>Productos vendidos</Text>
                <Metric>48</Metric>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card>
            <Title>Ventas Mensuales</Title>
            <BarChart
              className="mt-6"
              data={chartdata}
              index="month"
              categories={['ventas']}
              colors={['blue']}
              valueFormatter={(number) => `$${number.toLocaleString()}`}
              yAxisWidth={48}
            />
          </Card>
        </Col>

        <Card>
          <Title>Productos Recientes</Title>
          <div className="mt-6">
            {productosAgotados.map((producto) => (
              <div
                key={producto.id}
                className="flex items-center justify-between p-3 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{producto.imagen}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{producto.nombre}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{producto.precio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Col numColSpan={1} numColSpanLg={2}>
          <Card>
            <Title>Inventario</Title>
            <LineChart
              className="mt-6"
              data={inventoryData}
              index="month"
              categories={['existencias']}
              colors={['purple']}
              valueFormatter={(number) => number.toLocaleString()}
              yAxisWidth={40}
            />
          </Card>
        </Col>
      </Grid>
    </div>
  );
};

export default Dashboard;