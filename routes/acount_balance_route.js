import express from 'express'
const router = express.Router()
import checkAccountBalance from '../controllers/account_balance_controller.js'

router.post('/', checkAccountBalance)


export default router;