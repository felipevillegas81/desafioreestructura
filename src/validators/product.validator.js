import productServices from "../services/product.services.js";

class ProductValidator{

    async getById(id) {
        try {
            const product = await productServices.find(id)
            return product
        } catch(error) {
            return error
        }
    }

    async updateById(id, data) {
        try {
            const product = await productServices.update(id, data)
            return product
        } catch(error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productServices.delete(id)
            return product
        } catch(error) {
            return error
        }
    }
}

export default new ProductValidator()