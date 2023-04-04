import productModel from "../models/product.model.js"

class ProductServices {

    async getAll() {
        return productModel.find()
    }

    async create(data) {
        return productModel.create(data)
    }

    async find(id){
        return productModel.findById({_id: id})
    }

    async update(id, data){
        return productModel.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id){
        return productModel.findByIdAndDelete(id)
    }
}

export default new ProductServices()