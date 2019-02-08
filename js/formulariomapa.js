function lonlat() {
	
	var input = document.getElementById('paises');
    var pais = paises.options[e.selectedIndex].value;
	var lon = document.getElementById('lon');
    var lat = document.getElementById('lat');
	
	if (event.keyCode === 13 && input.value.length === 5) {
    
		var input = document.getElementById('paises');
        var pais = paises.options[e.selectedIndex].value;
        var lon = document.getElementById("lon");
        var lat = document.getElementById("lat");
        

        var xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + pais + '&key=AIzaSyDVPLLlJAQ679Frd0gu11khJ9mW02wsvWQ');

		xhr.done(function(data) {
            lon.innerHTML = data.results[0].geometry.location.lat;
            lat.innerHTML = data.results[0].geometry.location.lng;
		}); 
	}
}
document.getElementById("submit_btn").onclick = lonlat;