require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
//const dotenv = require('dotenv');
//const authRoutes = require('./routes/auth');

// Middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//// Cargar variables de entorno
//dotenv.config();

//app.use('/api', authRoutes); // Usar rutas de autenticación


// Rutes
const products_rute = require("./routes/products.routes");

app.use('/api/products', products_rute);


// DB connection
mongoose.connect(process.env.MONGODB_SERVER)
  .then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });




app.get('/', (req, res) => {res.send('Hello World!');});
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);});