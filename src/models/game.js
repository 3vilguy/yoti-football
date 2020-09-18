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
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
