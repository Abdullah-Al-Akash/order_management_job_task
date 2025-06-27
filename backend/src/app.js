const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Order Management System API is running');
});

// Routes:
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
