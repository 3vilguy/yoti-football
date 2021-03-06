import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import EventsList from './components/EventsList';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

function App() {
  const [eventsList, setEventsList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [addEventStatus, setAddEventStatus] = useState();

  const fetchEvents = () => {
    fetch("/api/events")
      .then(response => response.json())
      .then(data => setEventsList(data));
  };

  const addEvent = () => {
    setAddEventStatus("Adding");

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    const params = {
      startDate,
      endDate,
      recurring: repeatWeekly,
    };

    fetch("/api/addEvent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(data => setAddEventStatus("Done"));
  };

  const removeEvent = id => {
    const params = {
      id,
    };

    fetch("/api/removeEvent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response => setEventsList(
        eventsList.filter(
          event => event.id !== id && event.recurringEventId !== id
        )
      ));
  };

  return (
    <div>
      <h2>Event List</h2>
      <div className="container">
        <button onClick={fetchEvents}>
          Get Events
        </button>
        <EventsList
          eventsList={eventsList}
          removeEvent={removeEvent}
        />
      </div>

      <h2>Add Event</h2>
      <div className="container addEvents">
        Date:
        <ReactDatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <label>
          <input
            type="checkbox"
            checked={repeatWeekly}
            onChange={() => setRepeatWeekly(!repeatWeekly)}
          />
        Repeat weekly
       </label>
        <button onClick={addEvent}>
          Add Event
        </button>
        <p>{addEventStatus}</p>
      </div>
    </div>
  );
}

export default App;
