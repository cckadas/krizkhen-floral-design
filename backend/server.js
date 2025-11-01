require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoute');
const userRoutes = require('./routes/userRoute');

// express app
const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/orders/', orderRoutes)
app.use('/api/users/', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
