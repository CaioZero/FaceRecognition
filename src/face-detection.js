'use strict';
const fs = require("fs");
const request = require('request');
require(`dotenv`).config()
/*Image from google photos: "https://photos.app.goo.gl/aiqd8eCSH829b3w5A" */

/**Image from url */
//const imageUrl = "https://miro.medium.com/max/3200/1*CgfKGT2SHASf9dTnjg7h_w.jpeg"

const imageLocal = fs.readFileSync('./src/images/image.jpg')


// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const subscriptionKey = process.env.SUBSCRIPTION_FACE_API_KEY
const uriBase = process.env.URI_BASE

const options = {
    uri: uriBase,
    qs: params,
    //body: '{"url": ' + '"' + imageUrl + '"}', for internet images
    body: imageLocal,
    headers: {
        /*'Content-Type': 'application/json', for Url Images*/
        'Content-Type': 'application/octet-stream',//for local files
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});