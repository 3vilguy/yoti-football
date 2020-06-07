const Game = require('../../models/game');
const calendar = require('../../api/calendar');

const fetchCalendarEvents = async () => {
    const eventsList = await calendar.getEvents();
    return eventsList.data.items;
};

/**
 * Creates new Games in DB that are linked to the calendar events.
 * Update calendar events with IDs of newly created Games.
 * 
 * @param {[String]} eventsWithoutId - array of calendar events without associated Game ID
 */
const createGamesAndUpdateEvents = async (eventsWithoutId) => {
    const eventsToUpdate = eventsWithoutId.map(calendarId => ({ calendarId }))

    // Create games in DB
    const addedGames = await Game.collection.insertMany(eventsToUpdate);
    const newGamesIds = addedGames.insertedIds;

    // Update calendar events with game IDs
    const allUpdates = eventsWithoutId.map(
        (eventId, index) => {
            const updateBody = {
                description: JSON.stringify({
                    gameId: newGamesIds[index]
                })
            };
            return calendar.updateEvent(
                eventId,
                updateBody,
            )
        }
    );
    const results = await Promise.all(allUpdates);
    return results.map(result => result.data);
};

/**
 * Fetch Game objects linked to given event IDs.
 * 
 * @param {[String]} eventIds - array of calendar event IDs
 */
const fetchGames = (eventIds) => {
    return Game.find({
        calendarId: {
            $in: eventIds
        }
    });
};


module.exports = {
    fetchCalendarEvents,
    createGamesAndUpdateEvents,
    fetchGames,
};
