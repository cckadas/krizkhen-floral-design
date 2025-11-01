const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')

router.get('/get-all-orders/', orderController.getAllOrders);
router.get('/get-order/:id', orderController.getOrder);
router.post('/create-order/', orderController.createOrder);
router.delete('/delete-order/:id', orderController.deleteOrder);
router.patch('/update-order/:id', orderController.updateOrder);

module.exports = router