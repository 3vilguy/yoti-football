const express = require('express');
const auth = require('../middleware/auth');
const {
    fetchCalendarEvents,
    fetchGames,
    createGamesAndUpdateEvents
} = require('./helpers/gameHelpers');

const router = new express.Router();

const GAMES_TO_RETURN = 3;

router.get('/api/games', auth, async (req, res) => {
    try {
        const events = await fetchCalendarEvents();

        // Check for IDs in description field
        let idCounter = 0;
        let enoughEventsWithId = true;
        const eventsWithoutId = [];

        events.forEach(event => {
            try {
                const { gameId } = JSON.parse(event.description);
                if (gameId) {
                    idCounter++;
                } else {
                    throw new Error('Event without gameId');
                }
            } catch (e) {
                eventsWithoutId.push(event);
                if (idCounter < GAMES_TO_RETURN) {
                    enoughEventsWithId = false;
                }
            }
        });

        // Check if we have enough IDs to proceed
        if (enoughEventsWithId) {
            const eventIds = events.slice(0, GAMES_TO_RETURN).map(event => event.id);
            const games = await fetchGames(eventIds);
            res.send(games);

            // Shall we create some games for upcoming events?
            if (eventsWithoutId.length > 0) {
                createGamesAndUpdateEvents(eventsWithoutId);
            }
        } else {
            // Not enough games, let's create some
            await createGamesAndUpdateEvents(eventsWithoutId);

            const eventIds = events.slice(0, GAMES_TO_RETURN).map(event => event.id);
            const games = await fetchGames(eventIds);
            res.send(games);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
