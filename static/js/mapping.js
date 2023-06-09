let myMap = L.map('map', {
    center: [30.3, -97.7],
    zoom: 7
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = 'https://api.openbrewerydb.org/v1/breweries?by_state=texas&per_page=200'

d3.json(url).then(function(response) {
    // console.log(response);
    let heatArray = [];

    response.forEach(function(brewery) {
        let lat = parseFloat(brewery.latitude);
        let long = parseFloat(brewery.longitude);
        if(lat&&long) {
            heatArray.push([lat,long]);
        }
    });
    // console.log(heatArray)
    let heat = L.heatLayer(heatArray, {
        radius:30,
        blur:10
    }).addTo(myMap);
});