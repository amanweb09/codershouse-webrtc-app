const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    speakers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
        required: false
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
})

const Room = new mongoose.model('rooms', roomSchema, 'rooms');

module.exports = Room;