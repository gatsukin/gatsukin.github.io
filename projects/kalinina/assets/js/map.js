$(document).ready(function(){
	ymaps.ready(init);
	var myMap, 
	myPlacemark1;
});


function init(){ 
	myMap = new ymaps.Map("map", {
		center: [56.03125280889103,92.80129886941685],
		zoom: 16,
		controls: []
	}); 

	myMap2 = new ymaps.Map("footer__map", {
		center: [56.021641956961275,92.83698898412186],
		zoom: 14,
		controls: []
	}); 
	

	var currentLang = $('html').attr('lang');
	
	myPlacemark1 = new ymaps.Placemark([56.02157840022989,92.83707165277859], {
	}, {
			preset: 'islands#icon',
            iconColor: '#0095b6'
		});
	house1 = new ymaps.Placemark([56.03118692384263,92.80061360691501], {
	}, {
			preset: 'islands#icon',
            iconColor: '#0095b6'
		});
	house2 = new ymaps.Placemark([56.03136263578076,92.80189838503311], {
	}, {
			preset: 'islands#icon',
            iconColor: '#0095b6'
		});
	house3 = new ymaps.Placemark([56.03102472749453,92.80176427458241], {
	}, {
			preset: 'islands#icon',
            iconColor: '#0095b6'
		});
	
	
	myMap2.geoObjects.add(myPlacemark1);
	myMap.geoObjects.add(house1);
	myMap.geoObjects.add(house2);
	myMap.geoObjects.add(house3);
	myMap.behaviors.disable('scrollZoom');
	myMap.options.set('suppressMapOpenBlock', true); 

};


