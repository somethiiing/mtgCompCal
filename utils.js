const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const TOKEN_PATH = './creds/token.json';

function authorize(credentials, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function createEvent (newEvent) {
    // Load client secrets from a local file.
  fs.readFile('./creds/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), auth => {
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.insert({
        auth: auth,
        calendarId: 'wilsonyu.io_g0kphs5daeg4k03k2a4igjv7tg@group.calendar.google.com',
        resource: newEvent,
      }, (err, res) => {
        if (err) { console.log('Error: ' + err); }
        else { console.log('Event created: ', res.data.htmlLink); }
      });
    });
  });
}

function createISODate (date, time) {
  const dateArr = date.split('/');
  const month = dateArr[0] - 1;
  const day = dateArr[1];
  const year = dateArr[2];

  const timeArr = time.split(':');
  const hour = timeArr[0];
  const mins = timeArr[1] || '00';

  const newDate = new Date(year, month, day, hour, mins)

  return newDate.toISOString();
}

module.exports = {
  createEvent,
  createISODate
};
