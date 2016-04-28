var map;
var markers = [];
$(function () {
    loadmap();
});
function home() {
    window.location = "chome.html";
}

//=======================
function loadmap() {

    var defaultLatLng = new google.maps.LatLng(21.423106, 39.825692);  // Default to Hollywood, CA when no geolocation support
    if (navigator.geolocation) {
        function success(pos) {
            // Location found, show map with these coordinates
            document.getElementById("tbn").value=pos.coords.latitude;
            document.getElementById("tbe").value = pos.coords.longitude;
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 });
    }
    else {

        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
}
function drawMap(latlng) {

 
    var myOptions =
        {
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("showdata"), myOptions);
        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function (event) {
            clearMarkers();
            var info = event.latLng.toString();
            info = info.substr(1, info.length - 2);
            var pos = info.split(',');
            document.getElementById('tbn').value = pos[0];
            document.getElementById('tbe').value = pos[1];
            addMarker(event.latLng);
        });

    // Add an overlay to the map of current lat/lng

     addMarker(latlng);
    
}


// Adds a marker to the map and push to the array.
function addMarker(location) {
    //alert(location);
  var marker = new google.maps.Marker({
    position: location,
    map: map
});

  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


//------------------
function edit() {
    try {
        var lat = document.getElementById("tbn").value;
        var lan = document.getElementById("tbe").value;
        $.ajax({
            type: "POST",
            url: "Code/savelocation.ashx",
            crossDomain: true,
            data: {lat:lat,lan:lan},
            success: function (par) {
                showmessage(par);
            },
            error: function (par) { showmessage(par); }
        });
    } catch (e) { }

}