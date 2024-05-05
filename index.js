require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {log} = require('./utility/AppUtils')
const authRoutes = require('./routes/AuthRoutes')
const propertyRoutes = require('./routes/PropertyRoutes')

/**
 * APPLICATION CONFIG
 */
const port = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://we-2023-awfe.vercel.app']
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
app.use('/api/v1/property', propertyRoutes)


app.listen(port, () => log(`APP STARTED ON PORT ${port}`))