const express = require('express');
const cors = require('cors');
const app = express();

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

const PORT = 3001;

app.use(cors());

app.get('/', (req, res) => {
    calendar.events.list({
        auth: jwtClient,
        calendarId: CALENDAR_ID
    }, (err, resp) => {
        res.json(resp.data.items);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
