import express from 'express'
import controller from '../controllers/DepartmentController'
import JWTMiddleware from '../middleware/JWTMiddleware'

const router = express.Router()

router.get('/', controller.get)
router.get('/:_id', controller.getOne)
router.post('/', JWTMiddleware, controller.post)
router.put('/:_id', JWTMiddleware, controller.put)
router.delete('/:_id', JWTMiddleware, controller.delete)

export default router