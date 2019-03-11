const { createEvent, createISODate } = require('./utils');
const storeData = require('./data/data.js');

const timezone = 'America/New_York';

const createEventData = ({store, eventName, date, time, desc}) => {
  const startTime = createISODate(date, time);
  const endTime = createISODate(date, '17:00')
  const info = storeData[store];

  return {
    summary: `${eventName} - ${info.name}`,
    location: info.address,
    description: `${desc} \n ${info.fb} \n ${info.site}`,
    start: {
      dateTime: startTime,
      timeZone: timezone
    },
    end: {
      dateTime: endTime,
      timeZone: timezone
    }
  }
}

const addEventToCal = ({store, eventName, date, time, desc}) => {
  createEvent( createEventData({store, eventName, date, time, desc}) );
}

const listStores = () => {
  let stores = Object.keys(storeData).forEach( store => console.log(store));
}

// createEvent(createEventData({
//   store: 'wasteland',
//   eventName: 'Star City Games Regional Championships',
//   date: '3/9/2019',
//   time: '10:00',
//   desc: 'https://www.facebook.com/events/474156899783256/'
// }));

module.exports = {
  listStores,
  addEventToCal
};
