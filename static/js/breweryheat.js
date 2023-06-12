let myMap = L.map('map', {
    center: [30.3, -97.7],
    zoom: 7
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// list of states we want to pull data from
let states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
];
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
    }
}

// d3.json(url).then(function(response) {
//     // console.log(response);
//     let heatArray = [];

//     response.forEach(function(brewery) {
//         let lat = parseFloat(brewery.latitude);
//         let long = parseFloat(brewery.longitude);
//         if(lat&&long) {
//             heatArray.push([lat,long]);
//         }
//     });
//     // console.log(heatArray)
//     let heat = L.heatLayer(heatArray, {
//         radius:30,
//         blur:10
//     }).addTo(myMap);
// });