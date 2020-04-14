const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const app = express();

const { google } = require('googleapis');
const calendar = google.calendar('v3');

dotenv.config();

const jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar'],
    null
);

const PORT = process.env.PORT || 3001;
const CALENDAR_ID = process.env.CALENDAR_ID || 'primary';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
    calendar.events.list({
        auth: jwtClient,
        calendarId: CALENDAR_ID
    }, (err, resp) => {
        res.json(resp.data.items);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
