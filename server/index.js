const { google } = require('googleapis');
const calendar = google.calendar('v3');

const key = require('./JSON_KEY.json');
const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/calendar'],
    null
);

const CALENDAR_ID = 'primary';

calendar.events.list({
    auth: jwtClient,
    calendarId: CALENDAR_ID,
}, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
        events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
        });
    } else {
        console.log('No upcoming events found.');
    }
});
