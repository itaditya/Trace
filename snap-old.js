function load(api, callback) {
    var baseUrl = 'http://139.59.9.255:1880/';
    api = baseUrl + api;
    //api = "/api.json";
    var ajax = new XMLHttpRequest();
    ajax.overrideMimeType("application/json");
    ajax.open('GET', api, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == '200') {
            callback(JSON.parse(ajax.responseText));
        }
    };
    ajax.send(null);
}
function get(api, callback) {
    //api = "/api.json";
    var ajax = new XMLHttpRequest();
    ajax.overrideMimeType("application/json");
    ajax.open('GET', api, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == '200') {
            callback(JSON.parse(ajax.responseText));
        }
    };
    ajax.send(null);
}
window.onload = function () {
    // This example creates a 2-pixel-wide red polyline showing the path of William
    // Kingsford Smith's first trans-Pacific flight between Oakland, CA, and
    // Brisbane, Australia.
    function initMap() {
        var map = new google.maps.Map(document.querySelector('.map'), {
            zoom: 18,
            center: {
                lat: 28.452051,
                lng: 77.507614
            },
            mapTypeId: 'terrain'
        });
        load("data?deviceID=GPS001", function (data) {
            console.log(data.length);
            flightPlanCoordinates = [];
            // var snapCoordinates = "";
            for (var i = data.length - 1; i >= 0; i--) {
            // for (var i = 99; i >= 0; i--) {
                var coord = {
                    lat : parseFloat(data[i].lat),
                    lng : parseFloat(data[i].long)
                }
                // snapCoordinates += data[i].lat+","+data[i].long;
                // if(i != 0){
                //     snapCoordinates += "|";
                // }
                flightPlanCoordinates.push(coord);
            }
            console.log(flightPlanCoordinates);
            // console.log(snapCoordinates);
            // var snapUrl = "https://roads.googleapis.com/v1/snapToRoads?key=AIzaSyB24d4HqbeAf6KqXIkey885ShBDsW8m77g&interpolate=true&path="+snapCoordinates;
            // get(snapUrl, function(data) {
            //     console.log(data);
            // });
            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            flightPath.setMap(map);
        });
    }
    initMap();
}
// AIzaSyB24d4HqbeAf6KqXIkey885ShBDsW8m77g