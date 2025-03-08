// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [56.010563, 92.852572],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 13,
    // Убираем все лишние кнопки
    controls: []
  });

  // Создадим пользовательский макет ползунка масштаба.
  ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-size'><button id='zoom-in' class='btn'>+</button><button id='zoom-out' class='btn'>-</button></div>", {

      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        ZoomLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

        // Начинаем слушать клики на кнопках макета.
        $('#zoom-in').bind('click', this.zoomInCallback);
        $('#zoom-out').bind('click', this.zoomOutCallback);
      },

      clear: function () {
        // Снимаем обработчики кликов.
        $('#zoom-in').unbind('click', this.zoomInCallback);
        $('#zoom-out').unbind('click', this.zoomOutCallback);

        // Вызываем родительский метод clear.
        ZoomLayout.superclass.clear.call(this);
      },
      // Функции для зума
      zoomIn: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, {
          checkZoomRange: true
        });
      },
      zoomOut: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, {
          checkZoomRange: true
        });
      }
    }),
    // Финальная стадия
    zoomControl = new ymaps.control.ZoomControl({
      options: {
        layout: ZoomLayout,
        position: {
          top: 'auto',
          left: 'auto',
          right: '7%',
          bottom: 40
        }
      }
    });
  // Добавляем новый ползунок на карту
  myMap.controls.add(zoomControl);

  /////////////
  // ФИЛЬТР //
  ///////////

  function FilterBtn() {
    // создаем переменные
    let
      nonReady = document.getElementById("rdy-1").checked,
      ready = document.getElementById("rdy-2").checked,
      life = document.getElementById("life-1").checked,
      unlife = document.getElementById("life-2").checked,
      filter_r = new ymaps.GeoQueryResult(),
      filter_l = new ymaps.GeoQueryResult();

    myObjects.removeFromMap(myMap);
    // СТАТУС ПОСТРОЙКИ
    // Показываем если ГОТОВОЕ
    if (ready == true) {
      filter_r = myObjects.search(`options.ready="ready"`).add(filter_r)
      // ГОТОВОЕ ЖИЛОЕ
      if (life == true) {
        filter_r.removeFromMap(myMap);
        filter_lr = filter_r.search(`options.life="life"`).addToMap(myMap)
      } else if (unlife == false) {
        filter_r.addToMap(myMap)
      }
      // ГОТОВОЕ НЕЖИЛОЕ
      if (unlife == true) {
        filter_r.removeFromMap(myMap);
        filter_ulr = filter_r.search(`options.life="unlife"`).addToMap(myMap)
      } else if (life == false) {
        filter_r.addToMap(myMap)
      }
      // ГОТОВОЕ ЖИЛОЕ И НЕЖИЛОЕ
      if (life == true && unlife == true) {
        filter_r.addToMap(myMap)
      }
    }
    // НЕГОТОВОЕ
    if (nonReady == true) {
      filter_r = myObjects.search(`options.ready="nonReady"`).add(filter_r)
      // НЕГОТОВОЕ ЖИЛОЕ
      if (life == true) {
        filter_r.removeFromMap(myMap);
        filter_lr = filter_r.search(`options.life="life"`).addToMap(myMap)
      } else if (unlife == false) {
        filter_r.addToMap(myMap)
      }
      // НЕГОТОВОЕ НЕЖИЛОЕ 
      if (unlife == true) {
        filter_r.removeFromMap(myMap);
        filter_ulr = filter_r.search(`options.life="unlife"`).addToMap(myMap)
      } else if (life == false) {
        filter_r.addToMap(myMap)
      }
      // НЕГОТОВОЕ НЕЖИЛОЕ И ЖИЛОЕ
      if (life == true && unlife == true) {
        filter_r.addToMap(myMap)
      }
    }
    // Показываем все элементы если убраны филтры ГОТОВНОСТИ
    if (ready == false && nonReady == false) {
      myObjects.addToMap(myMap)
    }
    // ВИД ЖИЛЬЯ
    // ЕСЛИ УБРАНЫ ФИЛЬТРЫ ГОТОВОНОСТИ
    if (ready == false && nonReady == false) {
      myObjects.removeFromMap(myMap);
      // ЖИЛОЕ
      if (life == true) {
        filter_l = myObjects.search(`options.life="life"`).add(filter_l)
        // ЖИЛОЕ ГОТОВОЕ
        if (ready == true) {
          filter_l.removeFromMap(myMap);
          filter_lr = filter_l.search(`options.ready="ready"`).addToMap(myMap)
        } else if (nonReady == false) {
          filter_l.addToMap(myMap)
        }
        // ЖИЛОЕ НЕГОТОВОЕ
        if (nonReady == true) {
          filter_l.removeFromMap(myMap);
          filter_ulr = filter_l.search(`options.ready="nonReady"`).addToMap(myMap)
        } else if (ready == false) {
          filter_l.addToMap(myMap)
        }
        // ЖИЛОЕ ГОТОВОЕ ИЛИ НЕГОТОВОЕ 
        // ПРОВЕРКА НА ВСЯКИЙ СЛУЧАЙ
        if (ready == true && nonReady == true) {
          filter_l.addToMap(myMap)
        }
      }
      // НЕЖИЛОЕ
      if (unlife == true) {
        filter_l = myObjects.search(`options.life="unlife"`).add(filter_l)
        // НЕЖИЛОЕ ГОТОВОЕ
        if (ready == true) {
          filter_l.removeFromMap(myMap);
          filter_lr = filter_l.search(`options.ready="ready"`).addToMap(myMap)
        } else if (nonReady == false) {
          filter_l.addToMap(myMap)
        }
        // НЕЖИЛОЕ НЕГОТОВОЕ
        if (nonReady == true) {
          filter_l.removeFromMap(myMap);
          filter_ulr = filter_l.search(`options.ready="nonReady"`).addToMap(myMap)
        } else if (ready == false) {
          filter_l.addToMap(myMap)
        }
        // ЖИЛОЕ ГОТОВОЕ ИЛИ НЕГОТОВОЕ 
        // ПРОВЕРКА НА ВСЯКИЙ СЛУЧАЙ
        if (ready == true && nonReady == true) {
          filter_l.addToMap(myMap)
        }
      }
      // ЕСЛИ УБРАНЫ ФИЛЬТРЫ
      if (life == false && unlife == false) {
        myObjects.addToMap(myMap)
      }
    }
  }
  // следим за изменениями КНОПОК
  $('#lifeForm').change(FilterBtn);
  $('#rdyForm').change(FilterBtn);

  //////////////////////
  // КОЛЛЕКЦИЯ ТОЧЕК //
  ////////////////////

  // МАССИВ ДЛЯ ОБРАБОТАННОГО ЦИКЛА
  let points = []
  // МАССИВ ДАННЫХ
  let pointsArr = [{
      coordinates: [56.02057, 92.85253],
      icon: './assets/img/object/obj1.jpg',
      status: 'ready',
      life: 'life',
      name: 'ЖИЛОЙ ДОМ “О2”',
      description: `Тип дома	многоэтажный жилой дом <br> Срок сдачи	21.08.2024 <br> Застройщик	ИП Леоненко Дмитрий Николаевич`,
      link: './pages/detail.html'
    },
    {
      coordinates: [55.99003, 92.842572],
      icon: './assets/img/object/obj2.jpg',
      status: 'nonReady',
      life: 'unlife',
      name: 'ЖИЛОЙ ДОМ “О2”',
      description: `Тип дома	многоэтажный жилой дом <br> Срок сдачи	21.08.2024 <br> Застройщик	ИП Леоненко Дмитрий Николаевич`,
      link: './pages/detail.html'
    },
    {
      coordinates: [56.010563, 92.800772],
      icon: './assets/img/object/obj3.jpg',
      status: 'ready',
      life: 'unlife',
      name: 'ЖИЛОЙ ДОМ “О2”',
      description: `Тип дома	многоэтажный жилой дом <br> Срок сдачи	21.08.2024 <br> Застройщик	ИП Леоненко Дмитрий Николаевич`,
      link: './pages/detail.html'
    },
    {
      coordinates: [56.029463, 92.909572],
      icon: './assets/img/object/obj4.jpg',
      status: 'nonReady',
      life: 'life',
      name: 'ЖИЛОЙ ДОМ “О2”',
      description: `Тип дома	многоэтажный жилой дом <br> Срок сдачи	21.08.2024 <br> Застройщик	ИП Леоненко Дмитрий Николаевич`,
      link: './pages/detail.html'
    }
  ]
  // ЦИКЛ ДЛЯ ЗАПОЛНЕНИЯ МАССИВА
  for (var i = 0; i < pointsArr.length; i++) {
    let pointLayout = ymaps.templateLayoutFactory.createClass(`
        <div class="point">
          <a href="${pointsArr[i].link}" class="point__img">
            <img src="${pointsArr[i].icon}">
          </a>
          <div class="point__description">
                <div>
                  <h5>
                      <a href="${pointsArr[i].link}">
                          ${pointsArr[i].name}
                      </a>
                  </h5>
                  <p>
                    ${pointsArr[i].description}
                  </p>
                </div>
          </div>
      </div>
    `);

    item = {
      "type": "Feature",
      "id": `${i+1}`,
      "geometry": {
        "type": "Point",
        "coordinates": pointsArr[i].coordinates,
      },
      // "properties": {
      // "balloonContent": `${pointsArr[i].status} and ${pointsArr[i].life}`,
      // "clusterCaption": "нежилое готовое",
      // "hintContent": "нежилое готовое",
      // },
      options: {
        ready: pointsArr[i].status,
        life: pointsArr[i].life,
        hasBalloon: false,
        hasHint: false,
        zIndex: 2900,
        iconLayout: pointLayout,
        iconShape: {
          type: 'Circle',
          coordinates: [30, 30],
          radius: 30
        }
      }
    }
    points.push(item)
  }

  let pointLayoutOffice = ymaps.templateLayoutFactory.createClass(`
  <a href="#" class="point office" data-title="Наш офис">
   
      <div class="point__img office" >
        <img src="./assets/img/object/office.jpg">
      </div>
    
  </a>
`);

  item = {
    "type": "Feature",
    "id": `1337`,
    "geometry": {
      "type": "Point",
      "coordinates": [56.069463, 92.909572],
    },
    options: {
      ready: `ready`,
      life: `unlife`,
      hasBalloon: false,
      hasHint: false,
      zIndex: 2900,
      iconLayout: pointLayoutOffice,
      iconShape: {
        type: 'Circle',
        coordinates: [30, 30],
        radius: 30
      }
    }
  }
  points.push(item);
  // ОТОБРАЖЕНИЕ МАССИВА "POINTS" НА КАРТЕ
  window.myObjects = ymaps.geoQuery({
    type: "FeatureCollection",
    features: points
  }).addToMap(myMap);
}
