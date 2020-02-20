const State = {
  map: null,
  map_center: new google.maps.LatLng(55.097666, 73.384617)
}

const Markers = {
  main: null,
  second: null
}

Markers.addMain = function(pos, map) {
  this.main = new google.maps.Marker({
    position: pos,
    icon: '/images/map-icon.svg',
    map: map,
  });
}

Markers.addSecond = function(pos, map) {
  if (this.second !== null) this.removeSecond();
  this.second = new google.maps.Marker({
    position: pos,
    map: map,
  });
}

Markers.removeSecond = function() {
  this.second.setMap(null);
}

const Routes = {
  directionsService: new google.maps.DirectionsService(),
  directionsRenderer: new google.maps.DirectionsRenderer(),
}

Routes.createRoute = function(map, start, finish) {
  this.directionsRenderer.setMap(map);
  this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer, start, finish);
}

Routes.calculateAndDisplayRoute = function(directionsService, directionsRenderer, origin, destination) {
  directionsService.route({
      origin: {query: origin},
      destination: {query: destination},
      travelMode: 'DRIVING'
    },
    function (response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response)
        UI.editTravelTime(response.routes[0].legs[0].duration.text);
      }
      else {
        window.alert('Directions request failed due to ' + status)
      };
    });
}

const UI = {
  server_url: 'https://cors-anywhere.herokuapp.com/https://razdory2.ru/public/places.json?term=',
  searchWord: "",
  input: document.createElement("input"),
  adresList: document.createElement("ul"),
  travelTime: {
    el: document.createElement("div"),
    start_text: "Время в пути: ",
  }
}

UI.addInput = function(domelement) {
  var self = this;
  this.input.className = "formSearch";
  this.input.addEventListener("keyup", function(e) {
    if (e.code != "Enter") {
      self.searchWord = self.input.value;
      self.showAdresList();
    }
  });
  this.input.addEventListener("keyup", function(e) {
    if (e.code === "Enter") self.getAdresList();
  });
  domelement.appendChild(self.input);
}

UI.addAdresList = function(domelement) {
  this.adresList.className = "list";
  domelement.appendChild(this.adresList);
}

UI.addTravel = function (domelement) {
  var travel = this.travelTime;
  travel.el.className = "travel-time";
  travel.el.innerText = travel.start_text;
  domelement.appendChild(travel.el);
}

UI.editTravelTime = function (text) {
  this.travelTime.el.innerText = this.travelTime.start_text + " " + text;
  this.travelTime.el.style.display = "block";
}

UI.showAdresList = function() {
  if (this.searchWord.length > 3) {
    this.adresList.style.display = "block";
  } else {
    this.adresList.style.display = "none";
  }
}

UI.clearAdresList = function() {
  this.adresList.innerHTML = "";
}

UI.addToAdresList = function(list) {
  var self = this;
  this.clearAdresList();
  list.forEach(el => {
    var li = document.createElement("li");
    li.innerText = el;
    li.addEventListener("click", function (e) {
      self.input.value = "";
      self.input.value = this.innerText;
      self.clearAdresList();
      self.getGeocode(self.input.value);
    })
    this.adresList.appendChild(li);
  });
}

UI.getAdresList = function() {
  var self = this;
  $.getJSON(self.server_url + self.searchWord, function (response) {
    self.addToAdresList(response.suggests);
  });
};

UI.getGeocode = function(address) {
  var self = this;
  $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAu3jFyzPWbgIPmoFUCNFhGpLuRtHBLc4I`, function (response) {
  Routes.createRoute(
      State.map, 
      `${State.map_center.lat()}, ${State.map_center.lng()}`,
      `${response.results[0].geometry.location.lat}, ${response.results[0].geometry.location.lng}`
    );
  });
}

class GoogleMap {
  constructor(el, icon) {
    this.KEY = `AIzaSyAu3jFyzPWbgIPmoFUCNFhGpLuRtHBLc4I`;
    this.domelement = document.querySelector(el);
    this.map = null;
    this.icon = icon;
    this.mapOptions = {
      zoom: 12,
      disableDefaultUI: true,
      center: State.map_center,
      styles: [{
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#1e424e"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{
              "color": "#e5e8e7"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#fffff5"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#fffff5"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "labels.text.fill",
          "stylers": [{
              "visibility": "off"
            },
            {
              "color": "#361111"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "elementType": "all",
          "stylers": [{
            "color": "#ff0000"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.attraction",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.government",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.medical",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "all",
          "stylers": [{
              "color": "#91b65d"
            },
            {
              "gamma": 1.51
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#c0ecc2"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.place_of_worship",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.sports_complex",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi.sports_complex",
          "elementType": "geometry",
          "stylers": [{
              "color": "#c7c7c7"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#ff0000"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#b2b22e"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
              "color": "#ffffff"
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#c0ea6a"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.icon",
          "stylers": [{
              "color": "#ffffff"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#c0ea6a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "simplified"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [{
            "visibility": "on"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [{
              "color": "#ffffff"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "on"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#c0ea6a"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{
            "color": "#a0d3d3"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#d6f3f9"
          }]
        }
      ]
    };

    this.start();
  }

  start() {
    this.createMap();
    this.createUI();
    this.addMarker();
  }

  createMap() {
    this.map = new google.maps.Map(this.domelement, this.mapOptions);
    Markers.addMain(this.mapOptions.center, this.map);
    State.map = this.map;
  }

  addMarker() {
    var self = this;
    google.maps.event.addListener(this.map, "click", function (e) {
      var pos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      Routes.createRoute(
        self.map, 
        `${self.mapOptions.center.lat()}, ${self.mapOptions.center.lng()}`, 
        `${pos.lat}, ${pos.lng}`
      );
    })
  }

  createUI() {
    UI.addInput(this.domelement);
    UI.addAdresList(this.domelement);
    UI.addTravel(this.domelement);
  }
}

let map = new GoogleMap(".js-google-map");