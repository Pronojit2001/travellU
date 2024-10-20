var map = L.map('map').setView([22.5726, 88.3639], 13);


var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 25
}).addTo(map);

var satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: '&copy; <a href="https://www.google.com/maps">Google</a>'
});

var pandals = {
  'BAGBAZAR SARBAJANIN': [22.5885, 88.3697],
  'KUMARTULI PARK': [22.5865, 88.3730],
  'KUMARTULI': [22.5868, 88.3722],
  'AHIRITOLA': [22.5750, 88.3550],
  'TELENGA BAGAN': [22.5714, 88.3677],
  'MUCHIPARA': [22.5701, 88.3541],
  'CHALTA BAGAN': [22.5852, 88.3731],
  'PARK CIRCUS': [22.5580, 88.3644],
  'EKDALI EVERGREEN': [22.5851, 88.3686],
  'HINDUSTHAN PARK': [22.5453, 88.3618],
  'BOSE PUKUR': [22.5381, 88.3493],
  'SHIB MANDIR': [22.5832, 88.3705],
  'MUDIALI': [22.5682, 88.3511],
  '66 PALLI': [22.5745, 88.3679],
  'SINGHI PARK': [22.5526, 88.3597],
  'BADAMTALA ASAR SANGHA': [22.5695, 88.3578],
  'KASHI BOSE LANE': [22.5688, 88.3694]
};

for (var pandal in pandals) {
  L.marker(pandals[pandal]).addTo(map)
    .bindPopup("<b>" + pandal + "</b><br>Click for directions.<br><button onclick='setCurrentPandal(\"" + pandal + "\")'>Get Directions</button>");
}

var currentPandal = null;

function setCurrentPandal(pandalName) {
  currentPandal = pandalName;
}

function getDirections() {
  if (currentPandal) {
    var coords = pandals[currentPandal];
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + coords[0] + "," + coords[1];
    window.open(url, '_blank');
  } else {
    alert("Please select a pandal to get directions.");
  }
}


function focusOnPandal(pandalName) {
  
  var coords = pandals[pandalName];
  map.setView(coords, 15);
  currentPandal = pandalName;
}

function toggleMap() {
  if (map.hasLayer(satelliteLayer)) {
    map.removeLayer(satelliteLayer);
    map.addLayer(osmLayer);
    document.getElementById("toggleMap").innerText = "Show Satellite View";
  } else {
    map.removeLayer(osmLayer);
    map.addLayer(satelliteLayer);
    document.getElementById("toggleMap").innerText = "Show OpenStreetMap";
  }
}
