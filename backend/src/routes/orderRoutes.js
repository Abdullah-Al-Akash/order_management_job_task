const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderDetails, getCustomerOrders } = require('../controllers/orderController');


router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/:id', getOrderDetails);
router.get('/customer/:customerId', getCustomerOrders);

module.exports = router;
