// successes = 0
// failures = 0

// function assert(actual,expected) {
//   if(expected === actual) {
//     successes++
//   } else {
//     console.log("expected ", expected, " got ", actual)
//     failures++
//   }
// }

var coordinates;

function getTheCoords(address, callback) {
  var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':address}, function(results) {
      coords_obj = results[0].geometry.location;
      coordinates = [coords_obj.k, coords_obj.D];
      callback(coordinates);
    })
  }

getTheCoords('1045 mission street, san francisco CA', function(coordinates){console.log("fuckin" + coordinates)});


// }
// assert(getCoords('1045 mission street san francisco CA', myCallback), [37.7800206, -122.40959459999999])



// console.log(successes + " tests passed.")
// console.log(failures + " tests failed.")