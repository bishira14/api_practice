const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();
app.listen(3000, ()=> console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response)=>{
  database.find({},(err, data)=>{
    if(err){
      response.end();
      return
    }
     response.json(data);
  })
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  console.log(database);
  response.json(data);
});
//get weather api
app.get('/weather/:latlong', async (request, response)=>{
   console.log(request.params);
   const latlong = request.params.latlong.split(',');
   console.log(latlong);
   const lat = latlong[0];
   const long = latlong[1];
   console.log(lat, long);
   const api_key = process.env.API_KEY;
   const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;
   const weather_response = await fetch(weather_url);
   const weather_data = await weather_response.json();
   console.log(weather_data);


   const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${long}`;
   const aq_response = await fetch(aq_url);
   const aq_data = await aq_response.json();
   console.log(aq_data);

   const data = {
     weather: weather_data,
     air_quality: aq_data
   }

   response.json(data);
});
