const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
})

const Access = new mongoose.model('tokens', accessSchema, 'tokens');

module.exports = Access;