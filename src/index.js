const express = require('express');
require('./db/mongoose')
const path = require('path');
const userRouter = require('./routers/user');
const gameRouter = require('./routers/game');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(gameRouter);

// Put all API endpoints under '/api'
app.post('/api/addEvent', (req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const isRecurring = req.body.recurring;

    const event = {
        start: {
            dateTime: startDate,
            timeZone: 'Europe/London',
        },
        end: {
            dateTime: endDate,
            timeZone: 'Europe/London',
        },
    };

    if (isRecurring) {
        event['recurrence'] = ['RRULE:FREQ=WEEKLY'];
    }

    calendar.events.insert({
        auth: jwtClient,
        calendarId: CALENDAR_ID,
        resource: event,
    }, (err, resp) => {
        res.json({})
    });
});

app.post('/api/removeEvent', (req, res) => {
    const eventId = req.body.id;

    calendar.events.delete({
        auth: jwtClient,
        calendarId: CALENDAR_ID,
        eventId,
    }, (err, resp) => {
        res.json({})
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
