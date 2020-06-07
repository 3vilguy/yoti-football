const { google } = require('googleapis');
const calendar = google.calendar('v3');

const jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar'],
    null
);

const CALENDAR_ID = process.env.CALENDAR_ID || 'primary';

const getEvents = () => {
    return calendar.events.list({
        auth: jwtClient,
        calendarId: CALENDAR_ID,
        timeMin: (new Date()).toISOString(),
        orderBy: 'startTime',
        singleEvents: true, // For showing recurring events as separate ones 
        maxResults: 5,
    });
};

const updateEvent = (eventId, body) => {
    return calendar.events.patch({
        auth: jwtClient,
        calendarId: CALENDAR_ID,
        eventId: eventId,
        requestBody: body,
    })
};

module.exports = {
    getEvents,
    updateEvent,
};
