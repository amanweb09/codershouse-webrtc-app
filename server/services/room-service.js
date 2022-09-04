const Rooms = require('../models/room')

class RoomService {

    async create(payload) {
        const { topic, roomType, ownerId } = payload

        try {
            return await Rooms.create({
                topic,
                roomType,
                ownerId,
                speakers: [ownerId]
            })
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async getAllRooms(types) {
        try {
            return await Rooms
                .find({ roomType: { $in: types } })
                .populate('speakers')
                .populate('ownerId')
                .exec()
        } catch (error) {
            return error
        }
    }

    async getRoom(roomId) {
        try {
            return await Rooms
                .findOne({ _id: roomId })
                .populate('speakers')
                .populate('ownerId')
                .exec()
        } catch (error) {
            return error
        }
    }
}

module.exports = new RoomService()