require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors);

// Middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Rutes
const products_rute = require("./routes/products.routes");

app.use('/api/product', products_rute);


// DB connection
mongoose.connect(process.env.MONGODB_SERVER)
  .then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });




app.get('/', (req, res) => {res.send('Hello World!');});
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);});