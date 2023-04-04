import { Router } from 'express'
import productController from '../controllers/product.controller.js'
import cartsController from '../controllers/carts.controller.js'
import productModel  from '../models/product.model.js'

const router = Router()

const isSession = (req, res, next) => {
    if (req.session.user){
        return res.redirect('profile')
    }
    next()
}

//router.get('/', (req, res) => {
//    res.redirect('/login')
//})

//Restore
router.get('/restore', isSession, (req, res) => {
    res.render('restore')
})

//Login
router.get('/login', isSession, (req, res) => {
    res.render('login')
})

router.get('/register', isSession, (req, res) => {
    res.render('register')
})

router.get('/profile',(req, res) => {
    if(!req.session.user){
        return res.redirect('/login')
    }
    res.render('profile', 
    {user: req.session.user})
})

//Products
router.get('/', async (req, res) => {
    const { page } = req.query
    const { limit } = req.query
    const products = await productModel.paginate({}, { page: page || 1 , limit: limit || 2 });
//      const products = await productsDao.getAll()
//      console.log(products)

    const carts = await cartsController.getAll()
    
    res.render('index', 
    { title: 'Home', 
    products,
    carts,
    user: req.session.user})
})

router.get('/edit/:id', productController.getById)


router.get('/viewProduct/:id', async (req, res) => {
    const product = await productController.getById(req.params.id)
    
    res.render('viewProduct', 
    { title: 'viewProduct', 
    product })
})

router.delete("/deleteProduct/:id", productController.deleteProduct)

// router.get('/deleteProduct/:id', async (req, res) => {
//     const product = await productsController.deleteProduct(req.params.id)
//     const products = await productsController.getAll()
    
//     res.render('index', 
//     { title: 'Home', 
//     products })
//  })

router.get('/carts/:cid', async (req, res) => {
    const cart = await cartsController.getById(req.params.id)
    
    res.render('view', 
    { title: 'View', 
    cart })
})

export default router