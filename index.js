require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {log} = require('./utility/AppUtils')
const authRoutes = require('./routes/AuthRoutes')

/**
 * APPLICATION CONFIG
 */
const port = 8080;
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173']
}))

/**
 * DATABASE CONFIG
 */
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.once('connected', () => log('DATABASE CONNECTED'))
mongoose.connection.once('error', (er) => log('DATABASE ERROR: ', er))

/**
 * ROUTE CONFIG
 */
app.use('/api/v1/auth', authRoutes)


app.listen(port, () => log(`APP STARTED ON PORT ${port}`))