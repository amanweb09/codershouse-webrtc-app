const tokenService = require("../services/token-service");
const userService = require("../services/user-service")

const authMiddleware = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            throw new Error()
        }

        const userData = tokenService.verifyAccessToken(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (!userData) {
            throw new Error()
        }

        const user = await userService.findUser({ _id: userData._id })

        if (user) {
            req.user = user;
            next();
            return;
        }

        return res.status(404).json({ err: 'User not found' })

    } catch (error) {
        console.log(error);
        return res.status(401).json({ err: 'Invalid Token' })
    }
}

module.exports = authMiddleware;