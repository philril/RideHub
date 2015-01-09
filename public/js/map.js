var map;
var geocoder;
var pos;
var locations;

function initialize() {
  var mapOptions = {
    zoom: 11
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
}

function ajaxForCoords() {
  $.ajax({
    url: '/homeAjax',
    type: 'GET',
  }).done(function(data) {
    locations = data.ride_loc
    setMarkers()
  }).fail(function(){
    alert("Error")
  })
}

 function setMarkers() {
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
    }
  }

// Bias the autocomplete object to the user's geographical location, as supplied by the browser's 'navigator.geolocation' object.
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