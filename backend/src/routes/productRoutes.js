const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();

// Public GET (anyone can see products)
router.get('/', productController.getAllProducts);

// Protected POST (only admin can add products)
router.post('/', authenticateToken, isAdmin, productController.createProduct);

// Similarly protect update and delete routes:
router.put('/:id', authenticateToken, isAdmin, productController.updateProduct);
router.delete('/:id', authenticateToken, isAdmin, productController.deleteProduct);

module.exports = router;
