const RoomDto = require("../dtos/room-dto")
const roomService = require("../services/room-service")

class RoomsController {

    async create(req, res) {
        const { topic, roomType } = req.body

        if (!topic || !roomType) {
            return res.status(400).json({ err: "all fields are required" })
        }

        const room = await roomService.create({
            topic,
            roomType,
            ownerId: req.user._id
        })

        if (room) {
            return res.status(201).json({ room: new RoomDto(room) })
        }

        return res.status(500).json({ err: "Db error" })
    }

    async index(req, res) {
        const rooms = await roomService.getAllRooms(['open'])

        if (rooms && rooms.length) {

            const allRooms = rooms.map((room) => { return new RoomDto(room) })

            return res.status(200).json({ rooms: allRooms })
        }
        return res.status(500).json({ err: "Couldn't fetch rooms" })
    }

    async show(req, res) {
        const room = await roomService.getRoom(req.params.roomId)
        if(room) {
            return res.status(200).json({ room })
        }
        return res.status(500).json({ err: "Couldn't fetch room" })
    }
}

module.exports = new RoomsController()