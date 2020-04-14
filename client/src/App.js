import React, { useState } from 'react';
import './App.css';

function App() {
  const [eventsList, setEventsList] = useState([]);

  const fetchEvents = () => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setEventsList(data));
  };

  return (
    <div>
      <button onClick={fetchEvents}>
        Get Events
      </button>
      <ul>
        {
          eventsList.map(event => {
            const start = event.start.dateTime || event.start.date;
            return (
              <li key={event.id}>
                {start} - {event.summary}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
