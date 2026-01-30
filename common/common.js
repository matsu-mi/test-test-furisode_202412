
jQuery(document).ready(function($) {
       $('.slider').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: false,
              arrows: false,
              centerMode: true,
              centerPadding: "50px"
       });
});


//--------------------
//  スクロール
//--------------------
$('a[href^="#"]').click(function() {
  // スクロールの速度
  let speed = 400; // ミリ秒で記述
  let href = $(this).attr("href");
  let target = $(href == "#" || href == "" ? 'html' : href);
  let position = target.offset().top;
  $('body,html').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});


//--------------------
//  回転スライダー
//--------------------
const images = [
    'images/slider-beaut-01_20260202.jpg',
    'images/slider-beaut-02_20260202.jpg',
    'images/slider-beaut-03_20260202.jpg',
    'images/slider-beaut-04_20260202.jpg',
    'images/slider-beaut-05_20260202.jpg',
    'images/slider-beaut-06_20260202.jpg',
    'images/slider-beaut-07_20260202.jpg',
    'images/slider-beaut-08_20260202.jpg'
];

let currentIndex = 0;
let rotation = 0;
let isAnimating = false;
let autoTimer;

// ★ ここで定義するのではなく、関数の外では宣言だけしておくか、関数内で都度取得します。
let card, imgFront, imgBack;

function rotateSlider(direction = 1) {
    if (isAnimating || !card) return; // cardがない場合は何もしない
    isAnimating = true;

    currentIndex = (currentIndex + direction + images.length) % images.length;
    const nextIsBack = (Math.abs(rotation / 180) % 2 === 0);
    
    if (nextIsBack) {
        imgBack.src = images[currentIndex];
    } else {
        imgFront.src = images[currentIndex];
    }

    rotation += 180 * direction;
    card.style.transform = `rotateY(${rotation}deg)`;

    setTimeout(() => { isAnimating = false; }, 800);
}

function startTimer() {
    stopTimer();
    autoTimer = setInterval(() => rotateSlider(1), 3000);
}

function stopTimer() {
    if (autoTimer) clearInterval(autoTimer);
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') startTimer();
    else stopTimer();
});

function resetTimer() {
    startTimer();
}

// --- ページが読み込まれてから、要素を捕まえる ---
window.onload = () => {
    // ★ ここで初めてHTML要素を取得する！
    card = document.getElementById('card');
    imgFront = document.getElementById('img-front');
    imgBack = document.getElementById('img-back');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // 初期画像のセット（白い板対策）
    if(imgFront) imgFront.src = images[0];
    if(imgBack) imgBack.src = images[1];

    if(nextBtn) nextBtn.onclick = () => { rotateSlider(1); resetTimer(); };
    if(prevBtn) prevBtn.onclick = () => { rotateSlider(-1); resetTimer(); };

    if(card) {
        // マウス
        let startX = 0;
        card.addEventListener('mousedown', e => startX = e.pageX);
        card.addEventListener('mouseup', e => {
            let diff = startX - e.pageX;
            if (Math.abs(diff) > 50) { rotateSlider(diff > 0 ? 1 : -1); resetTimer(); }
        });

        // スマホ
        card.addEventListener('touchstart', e => startX = e.touches[0].pageX);
        card.addEventListener('touchend', e => {
            let diff = startX - e.changedTouches[0].pageX;
            if (Math.abs(diff) > 50) { rotateSlider(diff > 0 ? 1 : -1); resetTimer(); }
        });
    }

    startTimer();
};

// fix: スマホレイアウト調整