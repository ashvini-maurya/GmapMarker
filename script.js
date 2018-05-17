var map;

var myLocations
function getAPIData() {
  myLocations = [];

  $.ajax({
    url: "https://api.myjson.com/bins/1c65v2",
    type: "GET",
    dataType: "json",
    async: false,
    success: function (data) {
      for (let i in data) {
        myLocations.push([data[i].address, data[i].latitude, data[i].longitude]);
      }
    }
  })
  return myLocations;
};

getAPIData()



function initMap() {
  // var broadway = {
  //   info: '<strong>Chipotle on Broadway</strong><br>\
	// 				5224 N Broadway St<br> Chicago, IL 60640<br>\
	// 				',
  //   lat: 41.976816,
  //   long: -87.659916
  // };

  // var belmont = {
  //   info: '<strong>Chipotle on Belmont</strong><br>\
	// 				1025 W Belmont Ave<br> Chicago, IL 60657<br>\
	// 				',
  //   lat: 41.939670,
  //   long: -87.655167
  // };

  // var sheridan = {
  //   info: '<strong>Chipotle on Sheridan</strong><br>\r\
	// 				6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
	// 				',
  //   lat: 42.002707,
  //   long: -87.661236
  // };

  // var locations = [
  //   [
  //     '<strong>Chipotle on Broadway</strong><br>\
  //   5224 N Broadway St<br> Chicago, IL 60640<br>\
  //   ',
  //     41.976816, -87.659916],

  //   [belmont.info, belmont.lat, belmont.long],
  //   [sheridan.info, sheridan.lat, sheridan.long],
  // ]

  // console.log(myLocations);
  // console.log(locations);



  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(12.9144, 77.6340),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow({});

  var marker, i;

  for (i = 0; i < myLocations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(myLocations[i][1], myLocations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(myLocations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}
