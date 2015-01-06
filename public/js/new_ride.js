$( document ).ready(function() {

  $('#datepicker').datepicker();

  $('#timepicker').ptTimeSelect();

  $('#ride_form').submit(function(event){
    event.preventDefault();
    var coordinates;
    //get address
    var input = $(this).serializeArray();
    // console.log(input)
    var arr = [];
    var counter = 0;

    while (counter < 6) {
      arr.push(input[counter]['value']);
      counter++;
    }
    var address = String(arr.join(" "));
    //end get address

    // var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({'address':address}, function(results) {
    //     coords_obj = results[0].geometry.location;
    //     coordinates = [coords_obj.k, coords_obj.D];
    //     console.log(coordinates)
    //     // (ajax call within geocoder function:)
    //     ajax()
    //     })
    function getTheCoords(addressString, callbackFunction, formStuff) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': addressString}, function(results) {
        coords_obj = results[0].geometry.location;
        coordinates = [coords_obj.k, coords_obj.D];
        console.log("in get coords: "+coordinates);
        callbackFunction(coordinates, formStuff);
      });
    }

    getTheCoords(address, ajax, input)

    //end geocode address
    function ajax(coordinateArray, formData){
      console.log("in ajax")
      console.log(coordinates)
      $.ajax({
        type: 'post',
        url: '/new_ride',
        data: {
          street_number: formData[0]['value'],
          route: formData[1]['value'],
          locality: formData[2]['value'],
          state: formData[3]['value'],
          postal_code: formData[4]['value'],
          country: formData[5]['value'],
          location_add_detail: formData[6]['value'],
          ride_name: formData[7]['value'],
          date: formData[8]['value'],
          time: formData[9]['value'],
          description: formData[10]['value'],
          skill_level: formData[11]['value'],
          rider_leader_id: formData[12]['value'],
          estimated_ride_time: formData[13]['value'],
          expected_dist: formData[14]['value'],
          latitude: coordinateArray[0],
          longitude: coordinateArray[1]
        }
      }).done(function(){
        alert("Ride saved!")
      }).fail(function(){
        alert("Error! Please try again.")
      });
    }
  });
});


var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};
var geocoder;

function initialize() {

  var mapOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

//?
geocoder = new google.maps.Geocoder();
//?

var map = new google.maps.Map(document.getElementById('map'), mapOptions);

//SETS INITIAL SCREEN TO USERS CURRENT LOCATION
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

//END SETS INITIAL SCREEN TO USERS CURRENT LOCATION

autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')));
// , {types: ['geocode']});

autocomplete.bindTo('bounds', map);


google.maps.event.addListener(autocomplete, 'place_changed', function() {
// Get the place details from the autocomplete object.
var place = autocomplete.getPlace();

for (var component in componentForm) {
  document.getElementById(component).value = '';
  document.getElementById(component).disabled = false;
}
var newPos = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
map.setOptions({
  center: newPos,
  zoom: 15
});
//add a marker
var marker = new google.maps.Marker({
  position: newPos,
  map: map,
  title: "New marker"
});

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

);
}

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
};

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