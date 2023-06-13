let myMap = L.map('map', {
    center: [30.3, -97.7],
    zoom: 7
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let states = ['texas'];

// amount of pages we want to pull
let pages = [1, 2, 3];
// number of breweries to pull per page (max 200)
let quantity = 200;
// iterate through states array
for (let i = 0;i<states.length;i++) {
    let state = states[i];
    // pull multiple pages for each state
    for (let x = 0;x<pages.length;x++) {
        let page = pages[x];
    
        let url = `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&page=${page}&per_page=${quantity}`;
        // console.log(state,page)
        
        d3.json(url).then(function(response) {
            console.log(response);
            let markers = L.markerClusterGroup();
    //         // get lat and long for each brewery
            response.forEach(function(brewery) {
                let lat = parseFloat(brewery.latitude);
                let long = parseFloat(brewery.longitude);
                if(lat&&long) {
                    markers.addLayer(L.marker([lat, long])
                    .bindPopup("<h1>"+brewery.name+"</h1>"+'<hr>'
                    +'<h3>'+brewery.city+'</h3>'+'<hr>'
                    +'<h3>'+brewery.address_1+'</h3>'+'<hr>'
                    +'<h3>'+brewery.website_url+'</h3>'));
                }
        });
    myMap.addLayer(markers);
    });
}}