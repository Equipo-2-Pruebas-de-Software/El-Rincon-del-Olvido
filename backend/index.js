// index.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors')

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors({
  origin: PORT, // Cambia esto al dominio de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permitir envío de cookies o encabezados de autenticación
}));

// Cargar las rutas
const authRoutes = require('./routes/auth.routes'); // Descomentar autenticación
const productsRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes'); // Nueva ruta para el carrito

// Usar las rutas
app.use('/api/auth', authRoutes); // Usar rutas de autenticación
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes); // Añadir la ruta del carrito

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal, intenta nuevamente más tarde.' });
});

// Configuración de body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());