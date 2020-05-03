import React from 'react';
import './EventsList.css';

function EventsList({ eventsList, removeEvent }) {
  if (eventsList.length === 0) return null;

  return (
    <table>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>
            Remove<br/>
            (single)
          </th>
          <th>
            Remove<br/>
            (recurring)
          </th>
        </tr>
        {eventsList.map(event => {
          const start = event.start ? event.start.dateTime || event.start.date : event.originalStartTime.date;
          return (
            <tr key={event.id}>
              <td>{start}</td>
              <td>{event.summary}</td>
              <td>
                <button onClick={() => removeEvent(event.id)}>X</button>
              </td>
              <td>
                {event.recurringEventId &&
                  <button onClick={() => removeEvent(event.recurringEventId)}>
                    X
                  </button>
                }
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default EventsList;
