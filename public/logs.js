const mymap = L.map('theMap').setView([0, 0], 1);
//making a map and tiles
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
async function getData(){
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  for(item of data){
    const marker = L.marker([item.lat, item.long]).addTo(mymap);

    const txt = `The weather here at ${item.lat} &deg;, ${item.long}&deg;
    is ${item.weather.weather[0].description} with a temperature of ${item.weather.main.temp}&deg; F.
    The concentation of particulate matter (${item.air.parameter}) is ${item.air.value}
    ${item.air.unit} last read on ${item.air.lastUpdated}`;

    marker.bindPopup(txt);
  }



}
