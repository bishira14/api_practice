let button = document.getElementById('button');

  if('geolocation' in navigator){
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition( async position => {
    try{
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = long;

    const api_url = `weather/${lat},${long}`;
    const response = await fetch(api_url);
    const json = await  response.json();
    console.log(json);
    const weather = json.weather;
    const air = json.air_quality.results[0].measurements[0];
    document.getElementById('summary').textContent = weather.weather[0].description;
    document.getElementById('temperture').textContent = weather.main.temp;

    document.getElementById('aq_parameter').textContent = air.parameter;
    document.getElementById('aq_value').textContent = air.value;
    document.getElementById('aq_units').textContent = air.unit;
    document.getElementById('aq_date').textContent = air.lastUpdated;


    const data = {lat, long, weather, air};

    const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   };
   const db_response = await fetch('/api', options);
   const db_json = await response.json();
   console.log(db_json);


  }catch{
    console.error(error);
  //  console.log('something went wrong')
  document.getElementById('aq_value').textContent = 'NO reading';

  }



  });
  } else {
    console.log('geolocation not available');
  }
