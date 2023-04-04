import { Router } from "express"
import productController from "../controllers/product.controller.js"
import usersController from "../controllers/users.controller.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await productController.getAll()
        res.json(products)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.get("/:id", async (req, res) => {
    const product = await productController.getById(req.params.id)
    try {
        res.json(product)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.post("/", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const product = await productController.create(req.body)
        //res.json(product)
        res.redirect('/?message=product created successfully')
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

// router.put("/:id", productController.updateById)

 router.put("/:id", async (req, res) => {
     try {
         //Agregar Validación de Campos
         const product = await productController.update(req.params.id, req.body)
         res.json(product)
     } catch (error) {
         res.status(500).json( {error: error.message} )
     }
 })

router.delete("/deleteProduct/:id", productController.deleteProduct)

// router.delete("/:id", async (req, res) => {
//     try {
//         const product = await productsController.delete(req.params.id)
//         res.redirect('/?message=product deleted successfully')
//         res.json(product)
//     } catch (error) {
//         res.status(500).json( {error: error.message} )
//     }
// })

export default router