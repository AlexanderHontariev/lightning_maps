function getIconType(timeStartStr, timeEndStr, type) {
	var timeStart = Date.parse(timeStartStr);
	var timeEnd = Date.parse(timeEndStr);
	//var timezone = new Date(timeStartStr).getTimezoneOffset();
	var timeDif =  timeEnd - timeStart;// - (timezone*60*1000); //разница между локальным временем и гринвичем
	var Url = "";

	console.log(timeDif);
	// время в милисикундах
	if (type > 0) {
		if ( timeDif<1200000 ) {  //20min
			Url = 'img/icoPlusWhite.png';
		} else if (timeDif<2400000) {  //40min
			Url = 'img/icoPlusYellow.png';
		} else if (timeDif<3600000) {  //60min и т.д.
			Url = 'img/icoPlusLtOrange.png';
		} else if (timeDif<4800000) {
			Url = 'img/icoPlusOrange.png';
		} else if (timeDif<6000000) {
			Url = 'img/icoPlusScarlet.png';
		} else {
			Url = 'img/icoPlusRed.png';
		}
	} else if (type < 0) {
		if ( timeDif<1200000 ) {
			Url = 'img/icoMinusWhite.png';
		} else if (timeDif<2400000) {
			Url = 'img/icoMinusYellow.png';
		} else if (timeDif<3600000) {
			Url = 'img/icoMinusLtOrange.png';
		} else if (timeDif<4800000) {
			Url = 'img/icoMinusOrange.png';
		} else if (timeDif<6000000) {
			Url = 'img/icoMinusScarlet.png';
		} else  {
			Url = 'img/icoMinusRed.png';
		}
	}


	var ico = L.icon({
		    iconUrl: Url,
		    iconSize:     [10, 10], // size of the icon
		    iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
		    popupAnchor:  [5, 5] // point from which the popup should open relative to the iconAnchor
	});

	return ico;
}


