import userServices from '../services/user.services.js'

class UserValidator {

    async getAllUsers() {
        try {
            const users = await userServices.find()
            if(!users) throw new Error('No userd found')
            return users
        } catch (error) {
            return error
        }
    }
}

export default new UserValidator()