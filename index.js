const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Default page for '/'
app.get('/', (req, res) => {
  const defaultPage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Product API</title>
  </head>
  <body>
      <h1>Welcome to the Product API!</h1>
      <p>Use the following endpoints to manage products:</p>
      <ul>
          <li><strong>GET</strong> /products - Get all products</li>
          <li><strong>POST</strong> /products - Create a new product</li>
          <li><strong>GET</strong> /products/:id - Get a product by ID</li>
          <li><strong>PUT</strong> /products/:id - Update a product by ID</li>
          <li><strong>DELETE</strong> /products/:id - Delete a product by ID</li>
      </ul>
  </body>
  </html>
  `;
  res.send(defaultPage);
});

// Routes
app.use('/api', productRoutes);

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized...');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
