const FB = require('fb');

const { createEvent } = require('./utils');
const storeData = require('./data/data.js');
const creds = require('./creds/fbCreds');

const timeZone = 'America/New_York';
// 'id,name,place,date,start_time,end_time,description';
// const fields = 'id,name,date,start_time,end_time,description';
const fields = '';

let events = {};

const createFBEventLink = (id) => {
  return `https://www.facebook.com/events/${id}/`;
}

const getEventData = (cb) => {
  FB.setAccessToken(creds.token);

  FB.api(
    `/me/events?fields=${fields}`,
    'GET',
    (resp) => {
      if (resp.data === undefined) {
        throw new Error(JSON.stringify(resp, null, 2));
      } else {
        resp.data.forEach( event => events[event.id] = event);
        cb();
      }
    }
  );
}

const structureEventData = (store, eventId) => {
  const info = storeData[store];
  const event = events[eventId];
  const fbLink = createFBEventLink(eventId);

  if ( event === undefined ) {
    throw new Error(`Event missing in events array. Probably need to mark 'Interested' on event page.`)
  } else {
    return {
      summary: `${event.name} - ${info.name}`,
      location: info.address,
      description: `${event.description} \n ${fbLink} \n ${info.fb} \n ${info.site}`,
      start: {
        dateTime: (new Date(event.start_time) ).toISOString(),
        timeZone
      },
      end: {
        dateTime: (new Date(event.end_time) ).toISOString(),
        timeZone
      }
    };
  }
};

const autoCreateEvent = ({store, eventId}) => {
  getEventData( () => {
    createEvent( structureEventData(store, eventId) );
  });
};

const autoDebug = ({store, eventId}) => {
  getEventData( () => {
    console.log(events[eventId]);
  });
};

module.exports = {
  autoCreateEvent,
  autoDebug
}
