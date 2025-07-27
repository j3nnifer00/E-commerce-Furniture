// Entry file for the express app
// Required packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const path = require('path')
const cors = require('cors')
const http = require('http')

// Routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require('./routes/adminRoutes');
const sessionRoutes = require('./routes/sessionRoutes');


// -------------------------------------------------------------
// Start express app
const app = express();

// Middlewares

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('testing')

const apiURL = process.env.API_URL;
// Routes Handler
app.use(`/${apiURL}/user`, userRoutes);
app.use(`/${apiURL}/products`, productRoutes);
app.use(`/${apiURL}/category`, categoryRoutes);
app.use(`/${apiURL}/orders`, orderRoutes);
app.use(`/${apiURL}/admin`, adminRoutes);
app.use(`/${apiURL}/session`, sessionRoutes);

// ---------- DB ---------------------------------------------
// Connect to database and run the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    // Listen for requests
    http
    .createServer(app)
    .listen(process.env.PORT, () => {
      console.log(
        "Connected to database & Listening on port",
        process.env.PORT
      );
    });
    
  })
  .catch((error) => {
    console.log(error);
  });
