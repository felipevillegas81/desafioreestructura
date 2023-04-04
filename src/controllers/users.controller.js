import userValidator from '../validators/user.validator.js'

import { userModel } from "../models/user.model.js";

class UserController{
    
    async getAllUsers(req, res) {
        try {
            const users = await userValidator.getAllUsers()
            res.status(200).json(users)
        } catch(error) {
            res.status(500).json({ error: error.message })
        }
        
    }

    async getById(id) {
        return userModel.findOne({ _id: id })
    }

    async getByEmail(email) {
        return userModel.findOne({ email })
    }

    async create(data) {
        return await userModel.create(data)
    }

    async update(id, data) {
        return await userModel.updateOne({ _id: id}, { $set: data})
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            const user = await userValidator.deleteUser(id)
            res.json(user)

        } catch(error) {
            res.json(error)
            res.redirect('/?message=user deleted successfully')
        //return await userModel.deleteOne({ _id: id })
        }
    }

}

export default new UserController()