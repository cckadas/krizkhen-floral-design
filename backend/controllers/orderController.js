const Order = require('../models/orderModel')
const mongoose = require('mongoose')

/* GET all orders */
const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).sort({createdAt: -1})
    res.status(200).json(orders)
}


/* GET a single order */
const getOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'})
    } 
     
    const order = await Order.findById(id)

    if (!order) {
        return res.status(404).json({errpr: 'No such order'})
    }

    res.status(200).json(order)
}


/* CREATE new workout */
const createOrder = async (req, res) => {
    const {order_no, order_date} = req.body

    try {
        const order = await Order.create({order_no, order_date})
        res.status(200).json(order)
    }
    
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
 

/* DELETE an order */
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'})
    } 

    const order = await Order.findOneAndDelete({_id: id})

    if (!order) {
        return res.status(404).json({errpr: 'No such order'})
    }

    res.status(200).json(order)
}


/* UPDATE an order */
const updateOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'})
    } 

    const order = await Order.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!order) {
        return res.status(404).json({errpr: 'No such order'})
    }

    res.status(200).json(order)
}


module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}