const Users = require('../models/user')

class UserService {

    async findUser(filter) {
        try {
            return await Users.findOne(filter)
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async createUser(data) {
        try {
            return await Users.create(data)
        } catch (error) {
            console.log(error);
            return error
        }
    }

}

module.exports = new UserService()