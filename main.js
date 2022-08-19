window.onload = function () {
  let scrollBody = document.querySelector('.fix_motion');
  let titText = scrollBody.querySelector('.intro_txt');
  let maskLeft = scrollBody.querySelector('.left_mask');
  let maskRight = scrollBody.querySelector('.right_mask');
  let bgImage = scrollBody.querySelector('.bg_img');
  let endingContent = scrollBody.querySelector('.ending_txt');

  let scrollHeight;
  let sectionOffsetTop;
  let sectionScrolTop;
  let scrollRealHeight;
  let winScrollTop;
  let scrollPerecnt;
  let percent;

  function changeOverlap() {
    setProperty();
    motionRender();
  }

  function setProperty() {
    scrollHeight = scrollBody.offsetHeight;
    winScrollTop = window.pageYOffset;
    sectionOffsetTop =
      scrollBody.getBoundingClientRect().top + window.pageYOffset;
    scrollRealHeight = scrollHeight - window.innerHeight;
    sectionScrolTop = winScrollTop - sectionOffsetTop;
    scrollPerecnt = sectionScrolTop / scrollRealHeight;
    percent = scrollPerecnt * 100;
  }

  function motionRender() {
    let maskStartValue = 50;
    let maskEndValue = 0;
    let zoomValue = 1.5;
    let zoomOutValue = 1;
    let maskVal = Math.max(
      maskEndValue,
      maskStartValue - scrollPerecnt * maskStartValue
    );
    let scaleVal = Math.max(
      zoomOutValue,
      zoomValue - scrollPerecnt * zoomValue
    );

    maskLeft.style.width = maskVal + '%';
    maskRight.style.width = maskVal + '%';
    bgImage.style.transform = 'scale(' + scaleVal + ')';

    if (percent > 0.3) {
      titText.classList.add('active');
    } else {
      titText.classList.remove('active');
    }

    if (percent >= 70) {
      endingContent.classList.add('active');
    } else {
      endingContent.classList.remove('active');
    }
  }

  function init() {
    changeOverlap();
    bindEvent();
  }

  function bindEvent() {
    window.addEventListener('scroll', function () {
      changeOverlap();
    });

    window.addEventListener('resize', function () {
      changeOverlap();
    });
  }

  if (Modernizr.csspositionsticky) {
    init();
  }
};

// sec01
let isVisible = false;

$(window).on('scroll', function () {
  if (checkVisible($('.sec01')) && !isVisible) {
    document.querySelector('.sec01').classList.add('active');
    isVisible = true;
  }
});

function checkVisible(elm, eval) {
  eval = eval || 'object visible';
  let viewportHeight = $(window).height(),
    scrolltop = $(window).scrollTop(),
    y = $(elm).offset().top,
    elementHeight = $(elm).height();

  if (eval == 'object visible')
    return y < viewportHeight + scrolltop && y > scrolltop - elementHeight;
  if (eval == 'above') return y < viewportHeight + scrolltop;
}

//skill
$(function () {
  $(window).scroll(function () {
    if (
      $(this).scrollTop() >=
      Math.ceil($('.section_textmask').offset().top - 500)
    ) {
      setTimeout(function () {
        $('.section_textmask').addClass('active');
      }, 200);
    }
  });
});

// sec02

let allText = document.querySelectorAll('.txt');
window.addEventListener('scroll', function () {
  let dis =
    window.pageYOffset /
    ((document.querySelector('.scroll_box').offsetHeight - window.innerHeight) /
      1.8);
  let gap = 1;
  allText.forEach(function (arr, index) {
    arr.style = '--progress:' + Math.max(0, dis - index * gap) + '';
  });
});

// sec03
let section = $('.section03');
let offsetTop = [];
let offsetBottom = [];

function setValue() {
  winScrollTop = $(window).scrollTop();

  section.each(function (index, obj) {
    offsetTop[index] = $(obj).offset().top;
    offsetBottom[index] = offsetTop[index] + $(obj).height();
  });
}

function checkInSection() {
  if (winScrollTop >= offsetTop[0] && offsetBottom[0] > winScrollTop) {
    sectionActive(0);
  } else if (winScrollTop >= offsetTop[1] && offsetBottom[1] > winScrollTop) {
    sectionActive(1);
  } else if (winScrollTop >= offsetTop[2] && offsetBottom[2] > winScrollTop) {
    sectionActive(2);
  } else if (winScrollTop >= offsetTop[3] && offsetBottom[3] > winScrollTop) {
    sectionActive(3);
  } else if (winScrollTop >= offsetTop[4] && offsetBottom[4] > winScrollTop) {
    sectionActive(4);
  } else if (winScrollTop >= offsetTop[5] && offsetBottom[5] > winScrollTop) {
    sectionActive(5);
  } else if (winScrollTop >= offsetTop[6] && offsetBottom[6] > winScrollTop) {
    sectionActive(6);
  } else if (winScrollTop >= offsetTop[7] && offsetBottom[7] > winScrollTop) {
    sectionActive(7);
  }
}

function sectionActive(index) {
  listActive(index);
  changeText(index);
  changeColor(index);
  parallax();
}

function listActive(index) {
  let list = $('.sec03 .nav_list li a');
  list.removeClass('active');
  list.eq(index).addClass('active');
}

function changeText(index) {
  let targetText = $('.sec03 .fix_tit strong');
  let list = $('.sec03 .nav_list li a span');
  let getText = list.eq(index).text();

  targetText.text(getText);
}

function changeColor(index) {
  let targetText = $('.sec03 .fix_tit');
  let cubeBox = $('.sec03 .cube_box .cube_face');

  if (index === 1 || index === 2) {
    targetText.addClass('black');
    cubeBox.addClass('black');
  } else {
    targetText.removeClass('black');
    cubeBox.removeClass('black');
  }
}

function parallax() {
  let scrollHeight = $(document).height();
  let scrollRealHeight = scrollHeight - $(window).height();
  let scrollPerecnt = winScrollTop / scrollRealHeight;
  let parallaxDistance = 1100;
  let moveDistance = scrollPerecnt * parallaxDistance;

  $('.cube_box').css({
    transform:
      'rotateY(' + moveDistance + 'deg) rotateX(' + moveDistance + 'deg)',
  });
}

function init() {
  setValue();
  checkInSection();
}

$(window).scroll(function () {
  winScrollTop = $(window).scrollTop();
  checkInSection();
});

$(window).resize(function () {
  setValue();
  checkInSection();
});

$('.nav_list li a').click(function (e) {
  if ($(this.hash).offset()) {
    $('html').animate(
      {
        scrollTop: $(this.hash).offset().top,
      },
      300
    );
  }
});

$(function () {
  init();
});

// z-index

$(function () {
  let $sec2 = $('.sec03');
  let $page = $('.sec01');
  let $window = $(window);
  let pageOffsetTop = $page.offset().top;

  $window.resize(function () {
    pageOffsetTop = $page.offset().top;
  });

  $window.on('scroll', function () {
    let scrolled = $window.scrollTop() >= pageOffsetTop;
    $sec2.toggleClass('down', scrolled);
  });
});

// //svg

// window.onload = function () {
//   let svgPath = document.querySelector('#ggang_svg path');
//   let isPlay = false;

//   function svgSet() {
//     svgPath.style.strokeDasharray =
//       svgPath.getTotalLength() + ',' + svgPath.getTotalLength();
//     svgPath.style.strokeDashoffset = svgPath.getTotalLength();
//   }

//   function init() {
//     svgSet();
//     drawSvg();
//   }

//   function drawSvg() {
//     let winScrollTop = window.pageYOffset;
//     let scrollHeight = document.body.offsetHeight;
//     let scrollRealHeight = scrollHeight - window.innerHeight;
//     let parallaxPercent = (winScrollTop / scrollRealHeight) * 100 * 1.5;

//     let parallaxStartValue = svgPath.getTotalLength();
//     let parallaxMoveDistance = Math.max(
//       parallaxStartValue - parallaxStartValue,
//       Math.min(
//         parallaxStartValue,
//         parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
//       )
//     ); //패럴럭스 요소가 움직일 거리를 구합니다

//     svgPath.style.strokeDashoffset = parallaxMoveDistance;

//     if (parallaxPercent >= 100 && !isPlay) {
//       isPlay = true;
//       document.querySelector('.video_wrap').style.opacity = 1;

//       setTimeout(function () {
//         document.querySelector('.video_wrap video').play();
//         document.querySelector('.svg_wrap').style.opacity = 0;
//       }, 500);
//     } else if (parallaxPercent < 100 && isPlay) {
//       isPlay = false;
//       document.querySelector('.video_wrap').style.opacity = 0;

//       document.querySelector('.video_wrap video').pause();
//       document.querySelector('.video_wrap video').currentTime = 0;

//       document.querySelector('.svg_wrap').style.opacity = 1;
//     }
//   }

//   window.addEventListener(
//     'scroll',
//     function () {
//       drawSvg();
//     },
//     false
//   );

//   init();
// };
