const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    calendarId: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    players :[{
        _id: false,
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
