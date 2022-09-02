const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto')

class AuthController {

    sendOtp(req, res) {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ err: 'Phone is required' })
        }

        const otp = otpService.generateOtp()

        if (!otp) {
            return res.status(500).json({ err: "OTP couldn't be generated" })
        }
        console.log(otp);

        const ttl = 1000 * 60 * 5; //5 min
        const expires = Date.now() + ttl
        const data = `${phone}.${otp}.${expires}`

        const hash = hashService.hashOtp(data)
        return res.status(200).json({
            hash: `${hash}.${expires}`,
            phone
        })
    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body

        if (!phone || !otp || !hash) {
            return res.status(400).json({ err: 'All fields are required' })
        }

        const [hashedOtp, expires] = hash.split('.')
        if (Date.now() > +expires) {
            return res.status(400).json({ err: 'Otp expired' })
        }

        const data = `${phone}.${otp}.${expires}`

        const isValid = otpService.verifyOtp(hashedOtp, data)

        if (!isValid) {
            return res.status(400).json({ err: 'Invalid OTP' })
        }

        let user = await userService.findUser({ phone })

        let newUser;
        if (!user) {
            const createUser = await userService.createUser({ phone })

            if (!createUser) {
                return res.status(500).json({ message: 'Something went wrong' })
            }

            newUser = createUser
            const at = tokenService.generateTokens({ _id: newUser._id, activated: false }, process.env.ACCESS_TOKEN_SECRET)

            tokenService.storeRefreshToken(at, newUser._id)

            res.cookie('accessToken', at, {
                maxAge: 1000 * 60 * 6 * 24 * 30,
                httpOnly: true
            })

            const userDto = new UserDto(newUser)
            return res.status(200).json({ user: userDto, auth: true })
        }
        else {
            return res.status(400).json({ message: 'user already exists' })
        }

    }

    async refresh(req, res) {

        const userDto = new UserDto(req.user)
        return res.json({ user: userDto, auth: true })
    }

    async logout(req, res) {
        const deleteToken = await tokenService.removeToken(req.cookies.accessToken)

        if (deleteToken) {
            res.clearCookie('accessToken')
            return res.status(200).json({ user: null, auth: false })
        }

        return res.status(500).json({ err: 'Something went wrong' })
    }

}

module.exports = new AuthController()