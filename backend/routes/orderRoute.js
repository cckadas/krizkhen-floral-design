const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')


// GET all orders
router.get('/get-all-orders/', orderController.getAllOrders);

// GET single order
router.get('get-order/:id', orderController.getOrder);


// POST a new order
router.post('/create-order/', orderController.createOrder);


// DELETE a new order
router.delete('/delete-order/:id', orderController.deleteOrder);


// UPDATE an order
router.patch('/update-order/:id', orderController.updateOrder);


module.exports = router