import productValidator from '../validators/product.validator.js'

class ProductController {
    async getAll() {
        return productValidator.find()
    }
    async getById(id) {
         return await productValidator.getById(id)
    }

    async updateById(req, res) {
        try {
            const { id } = req.params
            const { data } = req.body
            const product = await productValidator.find(id)

            console.log(product)
            res.render('edit', 
            { title: 'Edit', 
            product })

        } catch(error) {
            res.json(error)
        }

    }
    async create(data) {
        return productModel.create(data)
    }
    // async update(id, data) {
    //     return await productModel.findByIdAndUpdate(id, data, { new: true })
    // }


    async deleteProduct(req, res) {
        try {
            const { id } = req.params
            const product = await productValidator.deleteProduct(id)
            res.json(product)
            
            res.render('index',         
            {title: 'Inicio'})
        } catch(error) {
            res.json(error)
        }
    }
}

export default new ProductController()
