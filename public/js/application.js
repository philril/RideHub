$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
var map;
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};
var geocoder


//make list of markers
// var marker, i;
// var locations = [
//   [],
//   [],
//   []
// ]

// for (i = 0; i < locations.length; i++) {
//   marker = new google.maps.Marker({
//     position: new google.maps.LatLng(locations[i][0], locations[i][1]),
//     map: map
//   });
//make list of markers


function initialize() {
  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  geocoder = new google.maps.Geocoder();


  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


 autocomplete = new google.maps.places.Autocomplete(
  (document.getElementById('autocomplete')),
  { types: ['geocode'] });
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInAddress();
  });
}


//GET ADDRESS (PUT IN SEPARATE HELPER FILE?)
$('#ride_form').on("submit", function(event){
  event.preventDefault();
  var input = $(this).serializeArray();
  var arr = [];

  var counter = 0

  while (counter < input.length) {
    arr.push(input[counter]['value']);
    counter++;
  }
  var address = String(arr.join(" "));
  console.log("In address" + address)
  //get coordinates is not working here. Do I need it here? Don't put marker on map right away. Do that when it's loaded up from the database:
  var latLong = getCoordinates(address);
  console.log(latLong);
  console.log("latLong " + latLong);
  setMarker(latLong);
})
  // $.ajax(
  //   url:
  //   type:
  //   ).done(function(){
  //     //what to do when done? don't put marker on map. Do that when it's loaded up from the database
  //   })

//GET ADDRESS


//GEOCODER
function getCoordinates(input_address) {
  // var coordinates;
  geocoder.geocode({address:input_address}, function(results, status) {
    coords_obj = results[0].geometry.location;
    coordinates = [coords_obj.k, coords_obj.D];
    return coordinates;
    console.log(coordinates);
  })
};
//GEOCODER

function setMarker(coordinates) {
  var markerOptions = {
    position: new google.maps.LatLng(coordinates[0],coordinates[1])
  };
  var marker = new google.maps.Marker(marketOptions);
  marker.setMap(map)
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);





});
