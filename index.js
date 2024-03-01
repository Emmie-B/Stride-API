import express from 'express'
import mongoose from 'mongoose'
import usersRoute from './routes/users_route.js'
import accountBalanceRoute from './routes/acount_balance_route.js'
import makeTransferRoute from './routes/transfer_route.js'

import 'dotenv/config'

const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// add the route
app.use('/createuser', usersRoute)
app.use('/checkbalance', accountBalanceRoute)
app.use('/makeTransfer', makeTransferRoute)

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(data => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log(`Failed to connect to MongoDB`, error.message)
  })

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
