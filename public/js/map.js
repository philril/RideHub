var map;
// var placeSearch, autocomplete;
// var componentForm = {
//   street_number: 'short_name',
//   route: 'long_name',
//   locality: 'long_name',
//   administrative_area_level_1: 'short_name',
//   country: 'long_name',
//   postal_code: 'short_name'
// };
var geocoder;
var pos;
var locations;


function initialize() {
  var mapOptions = {
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var geocoder = new google.maps.Geocoder();

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You are here!'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  ajaxForCoords()


//  autocomplete = new google.maps.places.Autocomplete(
//   (document.getElementById('autocomplete')),
//   { types: ['geocode'] });
//   google.maps.event.addListener(autocomplete, 'place_changed', function() {
//     fillInAddress();
//   });
// }

//GET ADDRESS (refactor and put into separate function. bind ajax to function?)
// $('#ride_form').on("submit", function(event){
//   event.preventDefault();
//   var input = $(this).serializeArray();
//   var arr = [];

//   var counter = 0

//   while (counter < input.length) {
//     arr.push(input[counter]['value']);
//     counter++;
//   }
//   var address = String(arr.join(" "));
//   console.log("ADDRESS: " + address)
//   //get coordinates is not working here. Do I need it here? Don't put marker on map right away. Do that when it's loaded up from the database:
//   getCoordinates(address, function(coordinates){
//     console.log("in get coordinates:" + coordinates)
//     setMarker(coordinates)
//   })

  // var latLong = getCoordinates(address);
  // console.log(latLong);
  // console.log("latLong " + latLong);
  // setMarker(latLong);
}
// )



function ajaxForCoords() {
  $.ajax({
    url: '/homeAjax',
    type: 'GET',
  }).done(function(data) {
    locations = data.ride_loc
    setMarkers()
  }).fail(function(){
    alert("error")
  })
}


 function setMarkers() {

  // [
  //     ['Bondi Beach', -33.890542, 151.274856, 4],
  //     ['Coogee Beach', -33.923036, 151.259052, 5],
  //     ['Cronulla Beach', -34.028249, 151.157507, 3],
  //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  //     ['Maroubra Beach', -33.950198, 151.259302, 1]
  //   ];

  var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        url: '/ride/'+locations[i][3],
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("<h4><a href='/ride/"+locations[i][3]+"'>"+locations[i][0]+"</a></h4><h5>"+locations[i][6]+" riders attending</h5><p>"+locations[i][4]+"</p><p>"+locations[i][5]+"</p>");
          infowindow.open(map, marker);
        }
      })(marker, i));


      // google.maps.event.addListener(infowindow, 'click', function(infowindow, i) {
      //   window.location.href = location[i].url;  //changed from markers[i] to this[i]
      // });

    }
  }
//GET ADDRESS



//GEOCODER
function getCoordinates(input_address, callback) {
  var geocoder = new google.maps.Geocoder();
  var coordinates;
  geocoder.geocode({'address':input_address}, function(results, status) {;
    coords_obj = results[0].geometry.location;
    coordinates = [coords_obj.k, coords_obj.D];
    callback(coordinates);
   })
  }//)
// };
//GEOCODER

function setMarker(coordinates) {

  var myPosition = new google.maps.LatLng(coordinates[0],coordinates[1])

  var markerOptions = {
    position: myPosition,
    map: map
  };

  var mapOptions = {
    zoom:10,
    center: pos
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map)
}

// function fillInAddress() {
//   // Get the place details from the autocomplete object.
//   var place = autocomplete.getPlace();

//   for (var component in componentForm) {
//     document.getElementById(component).value = '';
//     document.getElementById(component).disabled = false;
//   }

//   // Get each component of the address from the place details
//   // and fill the corresponding field on the form.
//   for (var i = 0; i < place.address_components.length; i++) {
//     var addressType = place.address_components[i].types[0];
//     if (componentForm[addressType]) {
//       var val = place.address_components[i][componentForm[addressType]];
//       document.getElementById(addressType).value = val;
//     }
//   }
// }

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


// google.maps.event.addDomListener(window, 'load', initialize);