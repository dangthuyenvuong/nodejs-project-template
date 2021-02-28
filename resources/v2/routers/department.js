import express from 'express'
import controller from '../controllers/DepartmentController'
import JWTMiddleware from '../../../middleware/JWTMiddleware'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ api: 'v2' })
})
router.get('/:_id', controller.getOne)
router.post('/', JWTMiddleware, controller.post)
router.put('/:_id', JWTMiddleware, controller.put)
router.delete('/:_id', JWTMiddleware, controller.delete)

export default router