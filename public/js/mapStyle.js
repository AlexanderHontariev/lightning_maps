// задание стиля карты
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/anastasija/cixvs5dil001d2sl5v74y2njy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5hc3Rhc2lqYSIsImEiOiJjaXEyMDVnb3UwMDN3aHduZHFwZ2l0c3VrIn0.CP3pmfquRmWDzjcb3uv2Hw', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com">Mapbox</a>',
	prefix: false
});
	
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '(c) OSM contributors',
	prefix: false
});
	
var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/anastasija/ciwq2iaqo000c2pnyxqdsfxz9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5hc3Rhc2lqYSIsImEiOiJjaXEyMDVnb3UwMDN3aHduZHFwZ2l0c3VrIn0.CP3pmfquRmWDzjcb3uv2Hw',{
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com">Mapbox</a>',
	prefix: false	
});