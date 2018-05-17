var map;

var myLocations
function getAPIData() {
  myLocations = [];

  $.ajax({
    url: "https://api.myjson.com/bins/1cxlim",
    type: "GET",
    dataType: "json",
    async: false,
    success: function (data) {
      for (let i in data) {
        myLocations.push([data[i].nursery_name, data[i].address, data[i].latitude, data[i].longitude, data[i].sapling_types, data[i].saplings]);
      }
    }
  })
  return myLocations;
};

getAPIData()

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(12.9144, 77.6340),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow({});

  var marker, i;
  for (i = 0; i < myLocations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(myLocations[i][2], myLocations[i][3]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        document.getElementById("nursery-name-and-address").innerHTML = myLocations[i][0] + " <br>" + myLocations[i][1];
        document.getElementById("nursery-saplings").innerHTML = myLocations[i][5][0].name;
        let total_quantity = myLocations[i][5][0].types["6 by 9 Bag"].quantity + myLocations[i][5][0].types["8 by 12 Bag"].quantity + myLocations[i][5][0].types["15 by 15 Bag"].quantity;

        document.getElementById("total-quantity").innerHTML = total_quantity;

        infowindow.setContent(myLocations[i][0] + "<br>" + myLocations[i][1]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}
