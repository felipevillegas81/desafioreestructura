import { Router } from "express"
import cartsController from "../controllers/carts.controller.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const carts = await cartsController.getAll()
        res.json(carts)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.get("/:id", async (req, res) => {
    try {
        const cart = await cartsController.getById(req.params.id)
        res.json(cart)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.post("/", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const cart = await cartsController.create(req.body)
        //res.json(product)
        res.redirect('/?message=cart created successfully')
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.put("/:id", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const cart = await cartsController.update(req.params.id, req.body)
        res.json(cart)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const cart = await cartsController.delete(req.params.id)
        res.redirect('/?message=cart deleted successfully')
        res.json(cart)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

export default router