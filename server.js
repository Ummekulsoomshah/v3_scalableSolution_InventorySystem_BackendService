const express=require('express');
const store=require('./routes/store')
const product=require('./routes/product')
const order=require('./routes/order')
const client=require('./db/databasepg')
const rateLimiter=require('./middlewares/rateLimiter')
const cors=require('cors');
const dotenv=require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(rateLimiter)
app.use('/api/store',store)
app.use('/api/product',product)
app.use('/api/order',order)
const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})