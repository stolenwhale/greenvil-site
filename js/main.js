/////////////////// Именованные функции ////////////////////////

// Вызов Глобальных функций
$(document).ready(function () {
  // bootstrapDev("init");
});
$(window).on('resize', function () {
  // bootstrapDev();
});

/////////////////// Анонимные функции ////////////////////////

// анимация переходов между страницами
$(function () {
  var openTimeline = new TimelineMax();
  var closeTimeline = new TimelineMax();

  openTimeline
    .set($('header .main-menu .header .menu .item'), {
      opacity: 0,
      transform: 'translateY(10px)'
    })
    .set($('.tagline'), {
      opacity: 0,
      transform: 'translateY(10px)'
    })
    .set($('.heading .image'), {
      opacity: 0,
      transform: 'translateY(5px)'
    })
    .set($('.headline'), {
      opacity: 0,
      transform: 'translateY(10px)'
    })
    .set($('.contacts .body .row'), {
      opacity: 0,
      transform: 'translateY(10px)'
    })
    .to($('.open-page-animation-item'), 0.7, {
      transform: 'skewY(-15deg) translateY(-200vh)',
      ease: Power2.easeIn
    })
    .to($('.open-page-animation-item'), 0, {
      display: 'none'
    })

  $('header .main-menu .header .menu .item').each(function () {
    openTimeline
      .to(this, 0.45, {
        opacity: 1,
        transform: 'none',
        ease: Power2.easeIn
      }, '-=0.3')
  })

  openTimeline
    .to($('.tagline'), 0.8, {
      opacity: 1,
      transform: 'none',
      ease: Power2.easeIn
    }, '-=0.7')
    .to($('.heading .image'), 0.8, {
      opacity: 1,
      transform: 'none',
      ease: Power2.easeIn
    }, '-=0.25')
    .to($('.headline'), 0.8, {
      opacity: 1,
      transform: 'none',
      ease: Power2.easeIn
    }, '-=0.25')
    .to($('.contacts .body .row'), 0.8, {
      opacity: 1,
      transform: 'none',
      ease: Power2.easeIn
    }, '-=1.2')


  $('a').click(function (event) {
    var href = this.href;
    event.preventDefault();

    function goPage() {
      window.location = href;
    }
    closeTimeline
      .to($('.close-page-animation-item'), 0, {
        display: 'block'
      })
      .to($('.close-page-animation-item'), 0.7, {
        transform: 'skewY(-15deg) translateY(-100vh)',
        ease: Power2.easeOut
      })
      .call(goPage)
  })
});



// анимация схемы дома в разрезе 
$(function () {
  new TweenMax
    .set($('.construction-technology .body .scheme .popup'), {
      opacity: 0,
      display: 'none',
      transform: 'translate(0, 10px)'
    })
  $('.construction-technology .body .scheme .mark').hover(
    function () {
      new TweenMax
        .to($('.popup', this), 0.3, {
          opacity: 1,
          display: 'block',
          transform: 'none'
        })
    },
    function () {
      new TweenMax
        .to($('.popup', this), 0.2, {
          opacity: 0,
          display: 'none',
          transform: 'translate(0, 10px)'
        })
    }
  )
});

// слайдер страница "расположение"
$(function () {
  $('.location .slider .body').slick();
});

// попап заявка
$(function () {
  var tl = new TimelineMax();

  $('.open-popup').on('click', function (evt) {
    evt.preventDefault();
    tl
      .to($('.contact-form .popup'), 0.2, {
        display: 'block',
        opacity: 1
      })
      .to($('.contact-form .popup .header'), 0.1, {
        opacity: 1
      })
      .to($('.contact-form .popup .form'), 0.1, {
        opacity: 1
      })
  })

  $('.contact-form .popup .close-button').on('click', function () {
    tl
      .to($('.contact-form .popup'), 0.3, {
        opacity: 0,
        display: 'none'
      })
      .to($('.contact-form .popup .header'), 0, {
        opacity: 0
      })
      .to($('.contact-form .popup .form'), 0, {
        opacity: 0
      })
  })
});

// фильтр коттеджей
$(function () {
  var tl = new TimelineMax();
  var typeOfCottage = ['single-storeyed', 'double-storeyed', 'three-storeyed']

  function doFilter() {
    typeOfCottage.forEach(function (type) {
      if (window.location.href.includes(type)) {
        tl
          .to($('.cottages-grid .item'), 0.25, {
            transform: 'rotateX(90deg)',
            opacity: 0
          })
          .to($('.cottages-grid .item'), 0, {
            display: 'none'
          })
          .to($('.cottages-grid .item.' + type), 0.45, {
            display: 'flex',
            transform: 'none',
            opacity: 1
          })
      }
    })
  }
  if (window.location.href.includes('-storeyed')) {
    doFilter(typeOfCottage)
  }
  $('.select .heading .cotteges-menu .menu .item').on('click', function () {
    var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    var newUrl = baseUrl + '?' + $(this).attr("id");
    history.pushState(null, null, newUrl);
    doFilter(typeOfCottage)
  })
});

// анимация доп. информации коттеджи внутренняя 
$(function () {
  var tl = new TimelineMax();
  tl.set($('.cottages-item .body .info .main'), {
    display: 'none',
    height: 0
  });
  $('.cottages-item .body .info .header p').on('click', function () {
    if ($(this).hasClass('closed')) {
      $(this).removeClass('closed')
      tl.to($('.cottages-item .body .info .main'), 0.3, {
          display: 'block',
          height: 'auto'
        })
        .to($('.cottages-item .body .info .main p'), 0.2, {
          opacity: 1
        })
    } else {
      $(this).addClass('closed');
      tl.to($('.cottages-item .body .info .main p'), 0.1, {
          opacity: 0
        })
        .to($('.cottages-item .body .info .main'), 0.2, {
          height: '0'
        })
        .to($('.cottages-item .body .info .main'), 0, {
          display: 'none'
        })
    }
  })

});

// слайдер коттеджи внутренняя 
$(function () {
  $('.cottages-item .heading .image .slider').slick();
});

// анимация свг при скролле главная

$(function () {
  if (window.location.pathname === '/' || window.location.pathname.includes('index.php')) {
    // поезд
    var trainController = new ScrollMagic.Controller();
    var stationTween = new TimelineMax();
    new TimelineMax()
      .set($('.main .advantages #poezd'), {
        transform: 'matrix(1,0,0,1,650,-370)'
      })
      .set($('.main .advantages #platform'), {
        opacity: 0,
        transform: 'translateY(20px)'
      })
      .set($('.main .advantages #relsy'), {
        transform: 'matrix(1,0,0,1,680,-400)'
      })

    $('.main .advantages #platform').each(function () {
      stationTween.to($(this), 0.2, {
        opacity: 1,
        transform: 'none'
      }, '-=0.06')
    })
    stationTween
      .to($('.main .advantages #relsy'), 2.2, {
        transform: 'none',
        ease: Expo.easeOut
      }, '-=0.9')
      .to($('.main .advantages #poezd'), 2.2, {
        transform: 'none',
        ease: Expo.easeOut
      }, '-=1.5')

    new ScrollMagic.Scene({
        triggerElement: '.main .advantages',
        triggerHook: 0.6,
        reverse: false
      })
      .setTween(stationTween)
      // .addIndicators()
      .addTo(trainController);

    // комната
    var roomController = new ScrollMagic.Controller();
    var roomTween = new TimelineMax();
    new TimelineMax().set($('.main .construction-technology .body .scheme .point'), {
        opacity: 0
      })
      .set($('.main .construction-technology .body .scheme #brick'), {
        opacity: 0,
        transform: 'translateY(-10px)'
      })
      .set($('.main .construction-technology .body .scheme .beam-1'), {
        transform: 'translate(190px, -100px)'
      })
      .set($('.main .construction-technology .body .scheme .beam-2'), {
        transform: 'translate(-80px, 80px)'
      })
      .set($('.main .construction-technology .body .scheme .beam-3'), {
        transform: 'translate(150px, -30px)'
      })
      .set($('.main .construction-technology .body .scheme .beam-4'), {
        transform: 'translate(-170px, -90px)'
      })
      .set($('.main .construction-technology .body .scheme .beam-5'), {
        transform: 'translate(-200px, -140px)'
      })
      .set($('.main .construction-technology .body .scheme #room'), {
        opacity: 0
      })
    roomTween.to($('.main .construction-technology .body .scheme #room'), 0.5, {
      opacity: 1
    })

    $('.main .construction-technology .body .scheme .beam').each(function () {
      roomTween.to($(this), 0.5, {
        transform: 'none'
      }, '-=0.35')
    })
    $('.main .construction-technology .body .scheme #brick').each(function () {
      roomTween.to($(this), 0.2, {
        opacity: 1,
        transform: 'none'
      }, '-=0.15')
    })
    roomTween.to($('.main .construction-technology .body .scheme .point'), 0.3, {
      opacity: 1
    })

    new ScrollMagic.Scene({
        triggerElement: '.main .construction-technology',
        triggerHook: 0.1,
        reverse: false
      }).setTween(roomTween)
      // .addIndicators()
      .addTo(roomController);
  }
});


// анимация свг при скролле виды домов
$(function () {
  if (window.location.pathname === '/page/select.php') {
    var cottagesController = new ScrollMagic.Controller();
    var cottagesTween = new TimelineMax();

    new TimelineMax()
      .set($('.select .image #ten1'), {
        opacity: 0
      })
      .set($('.select .image #ten1_1_'), {
        opacity: 0
      })
      .set($('.select .image #derevo_1_'), {
        opacity: 0
      })
      .set($('.select .image #derevo'), {
        opacity: 0
      })
      .set($('.select .image #house path'), {
        opacity: 0
      })
      .set($('.select .image #house rect'), {
        opacity: 0
      })
      .set($('.select .image #krysha'), {
        transform: 'translateY(-300px)'
      })


    cottagesTween.to($('.select .image #derevo_1_'), 0.3, {
        opacity: 1
      }, '+=1')
      .to($('.select .image #derevo'), 0.3, {
        opacity: 1
      }, '-=0.3')
      .to($('.select .image #ten1'), 0.3, {
        opacity: 1
      }, '-=0.3')
      .to($('.select .image #ten1_1_'), 0.3, {
        opacity: 1
      }, '-=0.3')

    $('.select .image #house path').each(function () {
      cottagesTween.to($(this), 0.5, {
        opacity: 1,
      }, '-=0.4997')
    })

    cottagesTween
      .to($('.select .image #krysha'), 0.4, {
        transform: 'none',
        ease: Circ.easeOut
      })
      .to($('.select .image #house rect'), 0.4, {
        opacity: 1
      }, '-=0.4')


    new ScrollMagic.Scene({
        triggerElement: '.select .heading .image',
        triggerHook: 1,
        reverse: false
      }).setTween(cottagesTween)
      // .addIndicators()
      .addTo(cottagesController);
  }
});

// анимация свг при скролле расположение
$(function () {
  if (window.location.pathname === '/page/location.php') {
    var locationTween = new TimelineMax();

    new TimelineMax()
      .set($('.location .heading .main-svg svg #map'), {
        opacity: 0
      })
      .set($('.location .heading .main-svg svg mask g'), {
        opacity: 0
      })
      .set($('.location .heading .main-svg svg #house_4_'), {
        opacity: 0,
        transform: 'translateY(-200px)'
      })
      .set($('.location .heading .main-svg svg #building_x5F_4_1_'), {
        opacity: 0,
        transform: 'translateY(-200px)'
      })
      .set($('.location .heading .main-svg svg #building_x5F_2_1_'), {
        opacity: 0,
        transform: 'translateY(-200px)'
      })
      .set($('.location .heading .main-svg svg #house_5_'), {
        opacity: 0,
        transform: 'translateY(-200px)'
      })
      .set($('.location .heading .main-svg svg #trees_1_'), {
        opacity: 0
      })
      .set($('.location .heading .main-svg svg #ten'), {
        opacity: 0
      })

    locationTween
      .to($('.location .heading .main-svg svg #map'), 0.2, {
        opacity: 1
      }, '+=1')
      .to($('.location .heading .main-svg svg mask g'), 0.2, {
        opacity: 1
      })
      .to($('.location .heading .main-svg svg #building_x5F_2_1_'), 0.4, {
        opacity: 1,
        transform: 'none'
      })
      .to($('.location .heading .main-svg svg #house_5_'), 0.4, {
        opacity: 1,
        transform: 'none'
      }, '-=0.25')
      .to($('.location .heading .main-svg svg #building_x5F_4_1_'), 0.4, {
        opacity: 1,
        transform: 'none'
      }, '-=0.25')
      .to($('.location .heading .main-svg svg #house_4_'), 0.4, {
        opacity: 1,
        transform: 'none'
      }, '-=0.25')
      .to($('.location .heading .main-svg svg #trees_1_'), 0.2, {
        opacity: 1
      }, '-=0.15')
      .to($('.location .heading .main-svg svg #ten'), 0.2, {
        opacity: 1
      }, '-=0.15')

  }
});

// мобильное меню
$(function () {
  var tl = new TimelineMax();
  $('header .main-menu .mobile-header .burger').click(function () {
    $(this).toggleClass('active');
    $('header .main-menu .mobile-menu').toggleClass('closed');
    if ($('header .main-menu .mobile-menu').hasClass('closed')) {
      tl
        .to($('main'), 0.2, {
          boxShadow: 'none)'
        }, '+=0.8')
        .to($('header .main-menu .mobile-menu .menu .item'), 0.3, {
          transform: 'translateX(-290px)',
          opacity: 0,
          ease: Power2.easeIn
        })
        .to($('header .main-menu .mobile-menu'), 0.3, {
          transform: 'translateY(-550px)',
          ease: Power2.easeIn
        })
        .to($('header .main-menu .mobile-menu'), 0.3, {
          display: 'none'
        })
        .to($('header .main-menu .mobile-menu .triangle'), 0, {
          display: 'none',
        })
    } else {
      tl
        .to($('header .main-menu .mobile-menu .triangle'), 0, {
          display: 'block',
        })
        .to($('header .main-menu .mobile-menu'), 0.3, {
          transform: 'none',
          display: 'flex',
          ease: Power2.easeOut
        })
        .to($('main'), 0, {
          boxShadow: 'inset 400px 400px 400px 400px rgba(34,50,88,0.10)'
        }, '+=0.3')
        .to($('header .main-menu .mobile-menu .menu .item'), 0.8, {
          transform: 'none',
          opacity: 1,
          ease: Power2.easeOut
        }, '+=0.6')
    }
  })
});

// плавный скролл
// $(function () {
// var html = document.documentElement;
// var body = document.body;

// var scroller = {
//   target: document.querySelector("#scroll-container"),
//   ease: 0.03, // <= scroll speed
//   endY: 0,
//   y: 0,
//   resizeRequest: 1,
//   scrollRequest: 0,
// };

// var requestId = null;

// TweenLite.set(scroller.target, {
//   rotation: 0.01,
//   force3D: true
// });

// window.addEventListener("load", onLoad);

// function onLoad() {    
//   updateScroller();  
//   window.focus();
//   window.addEventListener("resize", onResize);
//   document.addEventListener("scroll", onScroll); 
// }

// function updateScroller() {
  
//   var resized = scroller.resizeRequest > 0;
//   if (resized) {    
//     var height = scroller.target.clientHeight;
//     body.style.height = height + "px";
//     scroller.resizeRequest = 0;
//   }
//   var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
//   scroller.endY = scrollY;
//   scroller.y += (scrollY - scroller.y) * scroller.ease;
//   if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//     scroller.y = scrollY;
//     scroller.scrollRequest = 0;
//   }
//   TweenLite.set(scroller.target, { 
//     y: -scroller.y 
//   });
//   requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }
// function onScroll() {
//   scroller.scrollRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }

// function onResize() {
//   scroller.resizeRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }
// });

// появление при скролле
$(function () {
  new TimelineMax()
    .set($('.fade-up'), {
      opacity: 0,
      transform: 'translateY(10px)'
    })
  var controllerFadeIn = new ScrollMagic.Controller();
  $('.fade-up').each(function () {
    var tween = new TimelineMax()
      .to(this, 0.8, {
        opacity: 1,
        transform: 'none',
        ease: Power2.easeIn
      })
    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.85,
        reverse: false
      })
      .setTween(tween)
      .addTo(controllerFadeIn)
  })
});

// параллакс облака
$(function () {
  if (window.location.pathname === '/' || window.location.pathname.includes('index.php')) {
    var controller = new ScrollMagic.Controller();

    var tween = new TimelineMax()
      .to(".main .heading .image-parallax .image .cloud", 0.5, {
        transform: 'none',
        opacity: 1
      });

    new ScrollMagic.Scene({
        triggerElement: ".main .heading .image-parallax .image",
        offset: 200,
        duration: '50%'
      })
      .setTween(tween)
      .addTo(controller);
  }
});


// карта
$(function () {
  $('.formSearch').attr("placeholder", "Укажите пункт отправления");
});

// работа формы 
$(function () {
  $('.submit-request').on('click', function (event) {
    event.preventDefault();
    var nameInput = $('.contact-form .popup .form .personal-information input[type="text"].name'),
      phoneInput = $('.contact-form .popup .form .personal-information input[type="text"].phone'),
      checkbox = $('.contact-form .popup .form .accept [type="checkbox"]'),
      checkboxLabel = $('.contact-form .popup .form .accept label')
    fillingError = $('.contact-form .popup .filling-error');

    if (nameInput.val() === '') {
      nameInput.addClass('error');
      fillingError.removeClass('d-none');
    } else {
      nameInput.removeClass('error')
      fillingError.addClass('d-none');
    }
    if (phoneInput.val() === '') {
      phoneInput.addClass('error');
      fillingError.removeClass('d-none');
    } else {
      phoneInput.removeClass('error');
      fillingError.addClass('d-none');
    }
    if (!checkbox.prop('checked')) {
      checkboxLabel.addClass('error')
      fillingError.removeClass('d-none');
    }
    if ((nameInput.val() !== '') && (phoneInput.val() !== '') && (checkbox.prop('checked'))) {
      fillingError.addClass('d-none');
      new TimelineMax()
        .to(".contact-form .popup .form", 0.3, {
          display: 'none',
          opacity: 0
        })
        .to(".contact-form .popup .thank-you-message", 0.5, {
          display: 'block',
          opacity: 1
        });
    }
  })
});