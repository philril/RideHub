$( document ).ready(function() {

  $('#datepicker').datepicker();

  $('#timepicker').ptTimeSelect();

  $('#ride_form').submit(function(event){
    event.preventDefault();
    var coordinates;
    var input = $(this).serializeArray();
    //test
    var formData = $(this).serialize();
    console.log(formData);
    //test
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
    //geocodeAndPostNewRide(address, postNewRide, input)


//check names

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results) {
      coords_obj = results[0].geometry.location;
      coordinates = [coords_obj.k, coords_obj.D];
      console.log("in get coords: "+coordinates);
      postNewRide(coordinates);
    });

    console.log(input[5]['value'])

    function postNewRide(coordinateArray){
      console.log("in ajax: " + coordinates)
      $.ajax({
        type: 'post',
        url: '/edit_ride/'+$('#ride_id').html(),
        data: {
          street_number: input[0]['value'],
          route: input[1]['value'],
          locality: input[2]['value'],
          state: input[3]['value'],
          postal_code: input[4]['value'],
          country: input[5]['value'],
          location_add_detail: input[6]['value'],
          ride_name: input[7]['value'],
          date: input[8]['value'],
          time: input[9]['value'],
          description: input[10]['value'],
          skill_level: input[11]['value'],
          rider_leader_id: input[12]['value'],
          estimated_ride_time: input[13]['value'],
          expected_dist: input[14]['value'],
          latitude: coordinateArray[0],
          longitude: coordinateArray[1]
        }
      }).done(function(){
        window.location = '/ride/'+$('#ride_id').html()
      }).fail(function(){
        alert("Error! Please try again.")
      });
    };

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

geocoder = new google.maps.Geocoder();

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