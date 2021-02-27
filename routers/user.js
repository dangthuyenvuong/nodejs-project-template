import express from 'express'
import controller from '../controllers/UserController'
import JWTMiddleware from '../middleware/JWTMiddleware'

const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/refresh-token', controller.refreshToken)
router.post('/update-info', JWTMiddleware, controller.updateInfo)

export default router