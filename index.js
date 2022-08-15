const mongoose = require('mongoose')

const express = require('express')
const app = express()
const genre = require('./routes/genre')
const customer = require('./routes/customer')

mongoose.connect('mongodb://localhost:27017/vidly')
    .then(()=> {console.log('Connected to database server')})
    .catch(()=> console.error('Could not connect to database server'))


app.use(express.json())

app.use('/api/genres', genre)
app.use('/api/customers', customer)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))