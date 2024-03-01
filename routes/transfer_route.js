import express from 'express'
import makeTransfer from '../controllers/transaction_controller.js'
const router = express.Router()

router.post('/', makeTransfer)

export default router
