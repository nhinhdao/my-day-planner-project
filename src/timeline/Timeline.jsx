import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import TimelineItem from './TimelineItem';


/**
 * Converts array of events in to object having date as the key and list of 
 * event for that date as the value
 *
 * @param {Array} items Array of events in the form of ts and text
 * @returns {Object} return object with key as date and values array in events for that date
 */
function getFormattedData(items) {
  const activities = {};
  items.forEach(({ts, text, place}, index) => {
    const date = moment(ts);
    const dateStr = date.format('DD MMM YYYY');
    const list = activities[dateStr] || [];
    list.push({
      time: date.format('h:mm a'),
      text,
      date: ts,
      place,
      key: index,
    });
    activities[dateStr] = list;
  });
  return activities;
}

function Timeline({items, timetableID, updatePlace, handleDelete}) {
  const activities = getFormattedData(items);
  const dates = Object.keys(activities);
  return (
    <div className="time-line-ctnr">
      {dates.map(d =>
        <ul className="time-line" key={d}>
          <li className="time-label">
            <span>
              {d}
            </span>
          </li>
          {activities[d].map(({time, text, date, place, key}) =>
            <TimelineItem 
             updatePlace={updatePlace} 
             handleDelete={handleDelete}
             date={date} 
             time={time} 
             text={text} 
             timetableID={timetableID} 
             place={place} 
             key={key} 
             />,
          )}
        </ul>,
      )}
    </div>
  );
}

Timeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    ts: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default Timeline;
