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
