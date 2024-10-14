require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Cargar las rutas
const authRoutes = require('./routes/auth'); // Descomentar autenticación
const products_rute = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes'); // Nueva ruta para el carrito

// Usar las rutas
app.use('/api/auth', authRoutes); // Usar rutas de autenticación
app.use('/api/products', products_rute);
app.use('/api', cartRoutes); // Añadir la ruta del carrito

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
  console.log(`Server is running on port ${PORT}`);
});
