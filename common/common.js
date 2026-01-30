//==================================================
// 1. Slickスライダー (メインビジュアルなど)
//==================================================
jQuery(document).ready(function($) {
    if ($('.slider').length) {
        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            centerMode: true,
            centerPadding: "50px"
        });
    }
});

//==================================================
// 2. スムーススクロール
//==================================================
$(document).on('click', 'a[href^="#"]', function() {
    let speed = 400;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    if (target.length) {
        let position = target.offset().top;
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
    }
    return false;
});

//==================================================
// 3. 回転スライダー共通の処理
//==================================================
// タブを閉じた時に全タイマーを止める共通設定
document.addEventListener('visibilitychange', () => {
    // ページが見えなくなったらリロードに近い状態になるため、
    // 各スライダーの自動再生は個別の関数内で制御されます
});

//--------------------
// 回転スライダー 1
//--------------------
(function() {
    const images = [
        'images/slider-talent-A-01_20260202.jpg',
        'images/slider-talent-A-02_20260202.jpg',
        'images/slider-talent-A-03_20260202.jpg',
        'images/slider-talent-A-04_20260202.jpg',
        'images/slider-talent-A-05_20260202.jpg',
        'images/slider-talent-A-06_20260202.jpg',
        'images/slider-talent-A-07_20260202.jpg',
        'images/slider-talent-A-08_20260202.jpg'
    ];

    // 先読み
    images.forEach(src => { const img = new Image(); img.src = src; });

    let currentIndex = 0, rotation = 0, isAnimating = false, autoTimer;
    const card = document.getElementById('card');
    const imgFront = document.getElementById('img-front');
    const imgBack = document.getElementById('img-back');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    function rotateSlider(direction = 1) {
        if (isAnimating || !card) return;
        isAnimating = true;
        currentIndex = (currentIndex + direction + images.length) % images.length;
        const nextIsBack = (Math.abs((rotation + 180 * direction) / 180) % 2 !== 0);
        if (nextIsBack) { imgBack.src = images[currentIndex]; } 
        else { imgFront.src = images[currentIndex]; }
        rotation += 180 * direction;
        card.style.transform = `rotateY(${rotation}deg)`;
        setTimeout(() => { isAnimating = false; }, 800);
    }

    function startTimer() { stopTimer(); autoTimer = setInterval(() => rotateSlider(1), 3000); }
    function stopTimer() { if (autoTimer) clearInterval(autoTimer); }

    if(imgFront) imgFront.src = images[0];
    if(imgBack) imgBack.src = images[1];
    if(nextBtn) nextBtn.onclick = () => { rotateSlider(1); startTimer(); };
    if(prevBtn) prevBtn.onclick = () => { rotateSlider(-1); startTimer(); };

    if(card) {
        let startX = 0;
        card.addEventListener('mousedown', e => startX = e.pageX);
        card.addEventListener('mouseup', e => {
            let diff = startX - e.pageX;
            if (Math.abs(diff) > 50) { rotateSlider(diff > 0 ? 1 : -1); startTimer(); }
        });
        card.addEventListener('touchstart', e => startX = e.touches[0].pageX);
        card.addEventListener('touchend', e => {
            let diff = startX - e.changedTouches[0].pageX;
            if (Math.abs(diff) > 50) { rotateSlider(diff > 0 ? 1 : -1); startTimer(); }
        });
    }
    startTimer();
})();

//--------------------
// 回転スライダー 2
//--------------------
(function() {
    const images2 = [
        'images/slider-noa-01_20260202.jpg',
        'images/slider-noa-02_20260202.jpg',
        'images/slider-noa-03_20260202.jpg',
        'images/slider-noa-04_20260202.jpg',
        'images/slider-noa-05_20260202.jpg',
        'images/slider-noa-06_20260202.jpg',
        'images/slider-noa-07_20260202.jpg',
        'images/slider-noa-08_20260202.jpg'
    ];

    images2.forEach(src => { const img = new Image(); img.src = src; });

    let currentIndex2 = 0, rotation2 = 0, isAnimating2 = false, autoTimer2;
    const card2 = document.getElementById('card2');
    const imgFront2 = document.getElementById('img-front2');
    const imgBack2 = document.getElementById('img-back2');
    const nextBtn2 = document.getElementById('nextBtn2'); 
    const prevBtn2 = document.getElementById('prevBtn2');

    function rotateSlider2(direction = 1) {
        if (isAnimating2 || !card2) return;
        isAnimating2 = true;
        currentIndex2 = (currentIndex2 + direction + images2.length) % images2.length;
        const nextIsBack = (Math.abs((rotation2 + 180 * direction) / 180) % 2 !== 0);
        if (nextIsBack) { imgBack2.src = images2[currentIndex2]; }
        else { imgFront2.src = images2[currentIndex2]; }
        rotation2 += 180 * direction;
        card2.style.transform = `rotateY(${rotation2}deg)`;
        setTimeout(() => { isAnimating2 = false; }, 800);
    }

    function startTimer2() { stopTimer2(); autoTimer2 = setInterval(() => rotateSlider2(1), 3000); }
    function stopTimer2() { if (autoTimer2) clearInterval(autoTimer2); }

    if(imgFront2) imgFront2.src = images2[0];
    if(imgBack2) imgBack2.src = images2[1];
    if(nextBtn2) nextBtn2.onclick = () => { rotateSlider2(1); startTimer2(); };
    if(prevBtn2) prevBtn2.onclick = () => { rotateSlider2(-1); startTimer2(); };

    if(card2) {
        let startX2 = 0;
        card2.addEventListener('mousedown', e => startX2 = e.pageX);
        card2.addEventListener('mouseup', e => {
            let diff = startX2 - e.pageX;
            if (Math.abs(diff) > 50) { rotateSlider2(diff > 0 ? 1 : -1); startTimer2(); }
        });
        card2.addEventListener('touchstart', e => startX2 = e.touches[0].pageX);
        card2.addEventListener('touchend', e => {
            let diff = startX2 - e.changedTouches[0].pageX;
            if (Math.abs(diff) > 50) { rotateSlider2(diff > 0 ? 1 : -1); startTimer2(); }
        });
    }
    startTimer2();
})();

//--------------------
// 回転スライダー 3
//--------------------
(function() {
    const images3 = [
        'images/slider-maminette-01_20260202.jpg',
        'images/slider-maminette-02_20260202.jpg',
        'images/slider-maminette-03_20260202.jpg',
        'images/slider-maminette-04_20260202.jpg',
        'images/slider-maminette-05_20260202.jpg',
        'images/slider-maminette-06_20260202.jpg',
        'images/slider-maminette-07_20260202.jpg',
        'images/slider-maminette-08_20260202.jpg'
    ];

    images3.forEach(src => { const img = new Image(); img.src = src; });

    let currentIndex3 = 0, rotation3 = 0, isAnimating3 = false, autoTimer3;
    const card3 = document.getElementById('card3');
    const imgFront3 = document.getElementById('img-front3');
    const imgBack3 = document.getElementById('img-back3');
    const nextBtn3 = document.getElementById('nextBtn3'); 
    const prevBtn3 = document.getElementById('prevBtn3');

    function rotateSlider3(direction = 1) {
        if (isAnimating3 || !card3) return;
        isAnimating3 = true;
        currentIndex3 = (currentIndex3 + direction + images3.length) % images3.length;
        const nextIsBack = (Math.abs((rotation3 + 180 * direction) / 180) % 2 !== 0);
        if (nextIsBack) { imgBack3.src = images3[currentIndex3]; }
        else { imgFront3.src = images3[currentIndex3]; }
        rotation3 += 180 * direction;
        card3.style.transform = `rotateY(${rotation3}deg)`;
        setTimeout(() => { isAnimating3 = false; }, 800);
    }

    function startTimer3() { stopTimer3(); autoTimer3 = setInterval(() => rotateSlider3(1), 3000); }
    function stopTimer3() { if (autoTimer3) clearInterval(autoTimer3); }

    if(imgFront3) imgFront3.src = images3[0];
    if(imgBack3) imgBack3.src = images3[1];
    if(nextBtn3) nextBtn3.onclick = () => { rotateSlider3(1); startTimer3(); };
    if(prevBtn3) prevBtn3.onclick = () => { rotateSlider3(-1); startTimer3(); };

    if(card3) {
        let startX3 = 0;
        card3.addEventListener('mousedown', e => startX3 = e.pageX);
        card3.addEventListener('mouseup', e => {
            let diff = startX3 - e.pageX;
            if (Math.abs(diff) > 50) { rotateSlider3(diff > 0 ? 1 : -1); startTimer3(); }
        });
        card3.addEventListener('touchstart', e => startX3 = e.touches[0].pageX);
        card3.addEventListener('touchend', e => {
            let diff = startX3 - e.changedTouches[0].pageX;
            if (Math.abs(diff) > 50) { rotateSlider3(diff > 0 ? 1 : -1); startTimer3(); }
        });
    }
    startTimer3();
})();

//--------------------
// 回転スライダー 4
//--------------------
(function() {
    const images4 = [
        'images/slider-beaut-01_20260202.jpg',
        'images/slider-beaut-02_20260202.jpg',
        'images/slider-beaut-03_20260202.jpg',
        'images/slider-beaut-04_20260202.jpg',
        'images/slider-beaut-05_20260202.jpg',
        'images/slider-beaut-06_20260202.jpg',
        'images/slider-beaut-07_20260202.jpg',
        'images/slider-beaut-08_20260202.jpg'
    ];

    images4.forEach(src => { const img = new Image(); img.src = src; });

    let currentIndex4 = 0, rotation4 = 0, isAnimating4 = false, autoTimer4;
    const card4 = document.getElementById('card4');
    const imgFront4 = document.getElementById('img-front4');
    const imgBack4 = document.getElementById('img-back4');
    const nextBtn4 = document.getElementById('nextBtn4'); 
    const prevBtn4 = document.getElementById('prevBtn4');

    function rotateSlider4(direction = 1) {
        if (isAnimating4 || !card4) return;
        isAnimating4 = true;
        currentIndex4 = (currentIndex4 + direction + images4.length) % images4.length;
        const nextIsBack = (Math.abs((rotation4 + 180 * direction) / 180) % 2 !== 0);
        if (nextIsBack) { imgBack4.src = images4[currentIndex4]; }
        else { imgFront4.src = images4[currentIndex4]; }
        rotation4 += 180 * direction;
        card4.style.transform = `rotateY(${rotation4}deg)`;
        setTimeout(() => { isAnimating4 = false; }, 800);
    }

    function startTimer4() { stopTimer4(); autoTimer4 = setInterval(() => rotateSlider4(1), 3000); }
    function stopTimer4() { if (autoTimer4) clearInterval(autoTimer4); }

    if(imgFront4) imgFront4.src = images4[0];
    if(imgBack4) imgBack4.src = images4[1];
    if(nextBtn4) nextBtn4.onclick = () => { rotateSlider4(1); startTimer4(); };
    if(prevBtn4) prevBtn4.onclick = () => { rotateSlider4(-1); startTimer4(); };

    if(card4) {
        let startX4 = 0;
        card4.addEventListener('mousedown', e => startX4 = e.pageX);
        card4.addEventListener('mouseup', e => {
            let diff = startX4 - e.pageX;
            if (Math.abs(diff) > 50) { rotateSlider4(diff > 0 ? 1 : -1); startTimer4(); }
        });
        card4.addEventListener('touchstart', e => startX4 = e.touches[0].pageX);
        card4.addEventListener('touchend', e => {
            let diff = startX4 - e.changedTouches[0].pageX;
            if (Math.abs(diff) > 50) { rotateSlider4(diff > 0 ? 1 : -1); startTimer4(); }
        });
    }
    startTimer4();
})();