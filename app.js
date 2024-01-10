const express = require('express')
const app = express()
const morgan = require('morgan')

const tourRouter = require('./Routes/tourRouter')

const userRouter = require('./Routes/userRoutes')

module.exports = app

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res)=>{
    res.end('hello world')
})

app.use('/api/v1/tours',tourRouter)

app.use('/api/v1/users',userRouter)
