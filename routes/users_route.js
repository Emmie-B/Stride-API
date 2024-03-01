import express from 'express'
const router = express.Router()
import {createAccount} from '../controllers/users_controller.js'

router.post('/', createAccount)


export default router;