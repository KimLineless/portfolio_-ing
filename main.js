$(function SecFix() {
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
});

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

$(function () {
  if (window.innerWidth > 1024) {
    let allText = document.querySelectorAll('.txt');
    window.addEventListener('scroll', function () {
      let dis =
        window.pageYOffset /
        ((document.querySelector('.scroll_box').offsetHeight -
          window.innerHeight) /
          1.8);
      let gap = 1;
      allText.forEach(function (arr, index) {
        arr.style = '--progress:' + Math.max(0, dis - index * gap) + '';
      });
    });
  } else if (window.innerWidth < 1023) {
    let allText = document.querySelectorAll('.txt');
    window.addEventListener('scroll', function () {
      let dis =
        window.pageYOffset /
        ((document.querySelector('.scroll_box').offsetHeight -
          window.innerHeight) /
          2.4);
      let gap = 1;
      allText.forEach(function (arr, index) {
        arr.style = '--progress:' + Math.max(0, dis - index * gap) + '';
      });
    });
  }

  let bWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const nWidth = window.innerWidth;
    if ((bWidth < 1024 && nWidth >= 1024) || (bWidth > 100 && nWidth <= 1000)) {
      location.reload();
    }
    // beforeWidth = nowWidth;
  });

  function resize() {
    $('#sec4').load(window.location.href + '#sec4');
  }
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
  }
}

function sectionActive(index) {
  listActive(index);
  changeText(index);
  changeColor(index);
  changeImage(index);
  parallax();
}

function changeImage(index) {
  $('.cube_box .cube_face').removeClass('s0 s1 s2 s3');
  $('.cube_box .cube_face').addClass('s' + index);
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
  let targetText = $('.sec03 h2 a');
  let cubeBox = $('.sec03 .cube_box .cube_face');

  if (index === 0 || index === 2 || index === 3) {
    targetText.addClass('black');
  } else {
    targetText.removeClass('black');
  }

  if (index === 0) {
    targetText.attr(
      'href',
      'https://github.com/KimLineless/Gentlemonster_renewal/'
    );
  } else if (index === 1) {
    targetText.attr('href', 'https://github.com/KimLineless/Jenesis_renewal/');
  } else if (index === 2) {
    targetText.attr('href', 'https://github.com/KimLineless/Garts_renewal/');
  } else if (index === 3) {
    targetText.attr(
      'href',
      'https://github.com/KimLineless/baeksansu_renewal/'
    );
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
$(function () {
  let $sec3 = $('.sec_svg');
  let $page1 = $('.sec04');
  let $window = $(window);
  let pageOffsetTop1 = $page1.offset().top;

  $window.resize(function () {
    pageOffsetTop1 = $page1.offset().top;
  });

  $window.on('scroll', function () {
    let scrolled1 = $window.scrollTop() >= pageOffsetTop1;
    $sec3.toggleClass('down', scrolled1);
  });
});

//svg

$(function SecSvg() {
  window.onload = function () {
    let svgPath = document.querySelector('#svg path');
    let isPlay = false;

    function svgSet() {
      svgPath.style.strokeDasharray =
        svgPath.getTotalLength() + ',' + svgPath.getTotalLength();
      svgPath.style.strokeDashoffset = svgPath.getTotalLength();
    }

    function init() {
      svgSet();
      drawSvg();
    }

    function drawSvg() {
      let winScrollTop = $(window).scrollTop() - $('.sec_svg').offset().top;
      let scrollHeight = $('.sec_svg').height();
      let scrollRealHeight = scrollHeight - window.innerHeight;
      let parallaxPercent = (winScrollTop / scrollRealHeight) * 100 * 1.5;

      let parallaxStartValue = svgPath.getTotalLength();
      let parallaxMoveDistance = Math.max(
        parallaxStartValue - parallaxStartValue,
        Math.min(
          parallaxStartValue,
          parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
        )
      );

      //패럴럭스 요소가 움직일 거리

      svgPath.style.strokeDashoffset = parallaxMoveDistance;

      if (parallaxPercent >= 100 && !isPlay) {
        isPlay = true;
        document.querySelector('.video_wrap').style.opacity = 1;

        setTimeout(function () {
          document.querySelector('.video_wrap video').play();
          document.querySelector('.svg_wrap').style.opacity = 0;
        }, 500);
      } else if (parallaxPercent < 100 && isPlay) {
        isPlay = false;
        document.querySelector('.video_wrap').style.opacity = 0;

        document.querySelector('.video_wrap video').pause();
        document.querySelector('.video_wrap video').currentTime = 0;

        document.querySelector('.svg_wrap').style.opacity = 1;
      }
    }

    window.addEventListener(
      'scroll',
      function () {
        drawSvg();
      },
      false
    );

    init();
  };
});

// contact

let isVisible1 = false;

$(window).on('scroll', function () {
  if (checkVisible1($('.sec05')) && !isVisible1) {
    const $text = document.querySelector('.text');

    const letters = [
      '역량과 끈기를 갖춘',
      '성장하지만 겸손을 잃지 않는',
      '책임감 있고 함께 일할 때 시너지를 주는',
    ];

    const speed = 50;
    let i = 0;

    const typing = async () => {
      const letter = letters[i].split('');

      while (letter.length) {
        await wait(speed);
        $text.innerHTML += letter.shift();
      }

      await wait(800);

      if (letters[i + 1]) remove();
    };

    const remove = async () => {
      const letter = letters[i].split('');

      while (letter.length) {
        await wait(speed);

        letter.pop();
        $text.innerHTML = letter.join('');
      }

      i++;
      typing();
    };

    function wait(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    setTimeout(typing, 800);

    isVisible1 = true;
  }
});

function checkVisible1(elm, eval) {
  eval = eval || 'object visible';
  let viewportHeight = $(window).height(),
    scrolltop = $(window).scrollTop(),
    y = $(elm).offset().top,
    elementHeight = $(elm).height();

  if (eval == 'object visible')
    return y < viewportHeight + scrolltop && y > scrolltop - elementHeight;
  if (eval == 'above') return y < viewportHeight + scrolltop;
}
