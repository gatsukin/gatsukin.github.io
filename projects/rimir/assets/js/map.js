$(document).ready(function(){
	ymaps.ready(init);
	var myMap, 
	myPlacemark;
});


function init(){ 
	myMap = new ymaps.Map("about_map", {
		center: [56.04962684666286,92.85665221245151],
		zoom: 15,
		controls: [],
		type: 'yandex#satellite',
	}); 

    myMap2 = new ymaps.Map("footer_map", {
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
	

        myGeoObject = new ymaps.GeoObject({
        // Геометрия = тип геометрии + координаты геообъекта.
        geometry: {
            // Тип геометрии - прямоугольник.
            type: 'Polygon',
            // Координаты.
            coordinates: [
                [56.05463068634757, 92.86200679630954],
                [56.05278194918363, 92.86161688067284],
                [56.05347156866795,92.86016279390198],
                [56.054059934253196,92.86331707170348]
            ],
            fillRule: 'nonZero'
        },
        // Свойства.
        properties: {
            hintContent: 'Вот тут!',
            balloonContent: 'Участок'
        }
    }, {
        // Опции.
        // Цвет и прозрачность заливки.
        fillColor: '#9c8afa',
        // Цвет и прозрачность границ.
        strokeColor: '#fff',
        // Ширина линии.
        strokeWidth: 7
    });

            var myGeoObject = new ymaps.GeoObject({
        // Описываем геометрию геообъекта.
        geometry: {
            // Тип геометрии - "Многоугольник".
            type: "Polygon",
            // Указываем координаты вершин многоугольника.
            coordinates: [
                // Координаты вершин внешнего контура.
                [
                [56.05463068634757, 92.86200679630954],
                [56.05410574593891,92.86313067343893],
                [56.05286896849923,92.86139260199725],                
                [56.05347156866795, 92.86016279390198],

                ],
            ],
            // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
            fillRule: "nonZero"
        },
        // Описываем свойства геообъекта.
        properties:{
            // Содержимое балуна.
            balloonContent: "Многоугольник"
        }
    }, {
        // Описываем опции геообъекта.
        // Цвет заливки.
        fillColor: '#9c8afa',
        // Цвет обводки.
        strokeColor: '#fff',
        // Общая прозрачность (как для заливки, так и для обводки).
        opacity: 1,
        // Ширина обводки.
        strokeWidth: 5,
        // Стиль обводки.
        strokeStyle: 'solid'
    });

	
	myMap2.geoObjects.add(myPlacemark1);
	myMap.geoObjects.add(myGeoObject);
	myMap.behaviors.disable('scrollZoom');
	myMap.options.set('suppressMapOpenBlock', true); 

};


