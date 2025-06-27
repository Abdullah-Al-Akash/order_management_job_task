const express = require('express');
const router = express.Router();
const { createOrder, getOrderDetails, getCustomerOrders } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/:id', getOrderDetails);
router.get('/customer/:customerId', getCustomerOrders);

module.exports = router;
