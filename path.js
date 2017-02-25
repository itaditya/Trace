$(document).ready(function(){
    var map, flightPath;
    var baseUrl = 'http://139.59.9.255:1880/';
    function initMap() {
        map = new google.maps.Map($('.map')[0], {
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
        var deviceID = $("#deviceID").val();
        var link = baseUrl + "data?deviceID=" + deviceID;
        $.get(link, function (data) {
            console.log(data.length);
            flightPlanCoordinates = [];
            for (var i = data.length - 1; i >= 0; i--) {
                var coord = {
                    lat: parseFloat(data[i].lat),
                    lng: parseFloat(data[i].long)
                }
                flightPlanCoordinates.push(coord);
            }
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
    $('#choiceForm').on('submit', function () {
        event.preventDefault();
        drawPath();
    });

})