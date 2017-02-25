$(document).ready(function () {
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
    $('#datetimepicker1').datetimepicker({
        useCurrent: true,
        format: "ddd, MMM Do YYYY, h:mm:ss a",
        ignoreReadonly: true
    });
    $('#datetimepicker2').datetimepicker({
        useCurrent: false ,//Important! See issue #1075
        format: "ddd, MMM Do YYYY, h:mm:ss a",
        ignoreReadonly: true
    });
    $("#datetimepicker1").on("dp.change", function (e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker2").on("dp.change", function (e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });

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
