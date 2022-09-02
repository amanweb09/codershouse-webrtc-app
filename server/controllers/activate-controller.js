const Jimp = require('jimp')
const path = require('path')
const userService = require('../services/user-service')
const UserDto = require('../dtos/user-dto')

class ActivateController {

    async activate(req, res) {
        const { name, avatar } = req.body

        if (!name || !avatar) {
            return res.status(400).json({ err: "All fields are required" })
        }

        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64')

        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;

        try {
            const jimpRes = await Jimp.read(buffer)
            jimpRes
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imagePath}`))

        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: "Couldn't process the image" })
        }

        const user = await userService.findUser({ _id: req.user._id })

        if(!user) {
            return res.status(404).json({ err: "User not found" })
        }

        user.activated = true
        user.name = name
        user.avatar = `/storage/${imagePath}`

        try {
            await user.save()
            return res.status(200).json({ user: new UserDto(user), auth: true })
            
        } catch (error) {
            return res.status(500).json({ err: "User couldn't be saved" })
        }
    }

}

module.exports = new ActivateController()