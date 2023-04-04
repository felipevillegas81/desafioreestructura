import { Router } from "express"
import sessionRoutes from './session.routes.js'
import viewsRoutes from './views.routes.js'
import productsRoutes from './products.routes.js'
import cartsRoutes from "./carts.routes.js"

const router = Router()

router.use('/', viewsRoutes)
router.use('/session', sessionRoutes)
router.use('/sessions', sessionRoutes)
router.use('/products', productsRoutes)
router.use('/carts', cartsRoutes)

export default router