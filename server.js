// imports
const express = require('express')
require('dotenv').config
const app = express()
const path = require('path')

// Initailze app

// Database Configuration
const db = require('./config/db')

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3001

// Middlewares
const logger = require('morgan')
const cors = require('cors')

// use Middlewares
app.use(cors())
app.use(logger())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Require Routes

const AuthRouter = require('./routes/auth')
// const UserRouter = require('./routes/user')
// const itemRouter = require('./routes/item')

// use Routes

app.use('/auth', AuthRouter)
// app.use('/user', UserRouter)
// app.use('/item', itemRouter)
// app.use('/order', OrderRouter)
// app.use('/comment', CommentRouter)
// app.use('/address', AddressRouter)

// Listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
