// FB.api('oauth/access_token', {
//   client_id: appId,
//   client_secret: appSec,
//   redirect_uri: '/login',
//   grant_credentials: 'client_credentials'
// }, res => {
//   if(!res || res.error) {
//     console.log(!res ? 'error occurred' : res.error);
//     return;
//   }

//   accessToken = res.access_token;
//   console.log(accessToken)
// });



// curl -X GET "https://graph.facebook.com/oauth/access_token?client_id=2156071571082709&client_secret=7e9499d0061dbb7d4db0f21cbff86f75&grant_type=client_credentials"


// request(
//   'https://graph.facebook.com/oauth/access_token?client_id=2156071571082709&client_secret=7e9499d0061dbb7d4db0f21cbff86f75&grant_type=client_credentials',
//   { json: true },
//   (err, res, body) => {
//     if (err) return console.log(err);

//     console.log(body);
//     // accessToken = body.access_token;
//     console.log(accessToken);

//     callFBAPI()
//   }
// )

// const callFBAPI = () => {
//   // let url = `https://graph.facebook.com/me/events?access_token=${accessToken}`;
//   let url = `https://graph.facebook.com/474156899783256?access_token=${accessToken}`;
//   console.log('url: ', url);

//   request(
//     url,
//     { json: true },
//     (err, res, body) => {
//       if (err) return console.log(err);
//       console.log(body);
//     }
//   )
// }

// callFBAPI();