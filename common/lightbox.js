var gallery1Images = document.querySelectorAll('.gallery1 img');
var gallery2Images = document.querySelectorAll('.gallery2 img');
var lightbox = document.getElementById('lightbox');
var lightboxImage = document.getElementById('lightbox-image');
var prevArrow = document.getElementById('prev-arrow');
var nextArrow = document.getElementById('next-arrow');
var currentIndex = 0;
var currentGalleryImages; // 現在表示しているギャラリーの画像配列を格納する変数

var touchStartX = 0;
var touchEndX = 0;
var threshold = 50; // スワイプの閾値（調整可能）

function showLightbox(images, index) {
  lightboxImage.src = images[index].src;
  lightbox.classList.add('show');
  currentIndex = index;
  currentGalleryImages = images; // 現在表示しているギャラリーの画像配列を設定
}

gallery1Images.forEach(function(image, index) {
  image.addEventListener('click', function() {
    showLightbox(gallery1Images, index);
  });
});

gallery2Images.forEach(function(image, index) {
  image.addEventListener('click', function() {
    showLightbox(gallery2Images, index);
  });
});

prevArrow.addEventListener('click', function(event) {
  event.stopPropagation(); // 矢印クリック時にポップアップが閉じないようにする
  currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  lightboxImage.src = currentGalleryImages[currentIndex].src;
});

nextArrow.addEventListener('click', function(event) {
  event.stopPropagation(); // 矢印クリック時にポップアップが閉じないようにする
  currentIndex = (currentIndex + 1) % currentGalleryImages.length;
  lightboxImage.src = currentGalleryImages[currentIndex].src;
});

lightbox.addEventListener('touchstart', function(event) {
  touchStartX = event.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].screenX;

  var diffX = touchEndX - touchStartX;

  if (diffX > threshold) {
    // 右にスワイプ（前の画像を表示）
    lightboxImage.classList.add('swipe-right');
    lightboxImage.addEventListener('animationend', function() {
      lightboxImage.classList.remove('swipe-right');
      currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      lightboxImage.src = currentGalleryImages[currentIndex].src;
    }, { once: true });
  } else if (diffX < -threshold) {
    // 左にスワイプ（次の画像を表示）
    lightboxImage.classList.add('swipe-left');
    lightboxImage.addEventListener('animationend', function() {
      lightboxImage.classList.remove('swipe-left');
      currentIndex = (currentIndex + 1) % currentGalleryImages.length;
      lightboxImage.src = currentGalleryImages[currentIndex].src;
    }, { once: true });
  }
});

lightbox.addEventListener('click', function(event) {
  if (event.target === lightbox) {
    lightbox.classList.remove('show'); // ポップアップ外の領域クリック時にポップアップが閉じる
  }
});