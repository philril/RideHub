successes = 0
failures = 0

function assert(actual,expected) {
  if(expected === actual) {
    successes++
  } else {
    console.log("expected ", expected, " got ", actual)
    failures++
  }
}

// myCallback = function(coordinates){console.log(coordinates);
// }
// assert(getCoordinates('1045 mission street san francisco CA', myCallback), [37.7800206, -122.40959459999999])



console.log(successes + " tests passed.")
console.log(failures + " tests failed.")