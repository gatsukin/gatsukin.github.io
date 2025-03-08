$(document).ready(function(){
	ymaps.ready(init);
	var myMap, 
	myPlacemark1;
});



function init(){ 
	myMap = new ymaps.Map("map", {
		center: [54.719529, 20.497659],
		zoom: 12,
		controls: []
	}); 
	
	var langMsg = {
		'ru': {
			'hint': 'Офис Деловой Подход',
			'balloon': 'Калининград, ул. Мира, дом 666, офис 777',
		},
		'en': {
			'hint': 'Bauart Web Solutions Office',
			'balloon': '2nd Bryanskaya str, 20 "K", 4 floor',
		},
	};
	
	var currentLang = $('html').attr('lang');
	
	myPlacemark1 = new ymaps.Placemark([54.719529, 20.497659], {
		hintContent: langMsg[currentLang]['hint'],
		balloonContent: langMsg[currentLang]['balloon'],
	}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'img/placeholder_contact.png',
				// Размеры метки.
				iconImageSize: [38, 54],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-22.5, -57]
			});
	
	
	myMap.geoObjects.add(myPlacemark1);
	myMap.behaviors.disable('scrollZoom');
	myMap.options.set('suppressMapOpenBlock', true);

};