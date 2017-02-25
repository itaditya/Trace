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
    var map, flightPath;

    function initMap() {
        map = new google.maps.Map(document.querySelector('.map'), {
            zoom: 18,
            center: {
                lat: 28.452051,
                lng: 77.507614
            },
            mapTypeId: 'terrain'
        });
    }
    initMap();

    function drawPath(t) {
        var deviceID = document.querySelector("#deviceID").value;
        var link = "data?deviceID=" + deviceID;
        load(link, function (data) {
            console.log(data.length);
            flightPlanCoordinates = [];
            for (var i = data.length - 1; i >= 0; i--) {
                var coord = {
                    lat: parseFloat(data[i].lat),
                    lng: parseFloat(data[i].long)
                }
                flightPlanCoordinates.push(coord);
            }
            console.log(flightPlanCoordinates);
            if (flightPath) {
                flightPath.setMap(null);
            }
            flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            flightPath.setMap(map);
        });
    }
    drawPath();
    document.querySelector('#choiceForm').addEventListener('submit', function () {
        event.preventDefault();
        drawPath();
    });
}
