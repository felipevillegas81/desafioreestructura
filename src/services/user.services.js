import { userModel } from "../models/user.model.js";

class UserServices {

    async find(){
        return await userModel.find()
    }

}

export default new UserServices()