const jwt = require('jsonwebtoken')
const Access = require('../models/access-token')

class TokenService {

    generateTokens(payload, secret) {
        return jwt.sign(payload, secret, {
            expiresIn: '2d'
        })
    }

    async storeRefreshToken(token, userId) {
        try {
            return await Access.create({ token, userId })
        } catch (error) {
            console.log(err.message);
            return error
        }
    }

    verifyAccessToken(token, secret) {
        return jwt.verify(token, secret, (err, payload) => {
            if (err) {
                return err
            }
            return payload
        })
    }

    async removeToken(token) {
        try {
            return await Access.deleteOne({ token })
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports = new TokenService()