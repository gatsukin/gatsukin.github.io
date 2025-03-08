$(".jsBtnModal").on("click", function (event) {
    // console.log(event.target.dataset);
    var arDataAtr = event.target.dataset;

    // получаем и устанавливаем значения из атрибутов типа "data-*"
    $(".jsModal").attr("id", arDataAtr.modalId).addClass("active");
    $(".jsModalTitle").text(arDataAtr.modalTitle);
    $(".jsModalSubTitle").text(arDataAtr.modalSubtitle);
    $(".jsModalForm").attr("name", arDataAtr.modalFormName);

    // Плавный эффект появления
    $(".modal").animate({
        "opacity": "1",
        "top": "0"
    });
});

// Плавный эффект исчезновения
$(".modal .jsCloseModal").on("click", function () {
    $(".modal").animate({
        "opacity": "0",
        "top": "100%"
    }).removeClass("active");
});


$(document).ready(function() {
    $('.gallery_slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        responsive: [{
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.documets_slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        infinite: true,
        dots: false,
        arrows: true,
        responsive: [{
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 675,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 465,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    $('#menuBtnMobile').click(function (e) {
        $('.menu__list').slideToggle('slow');
    });
});