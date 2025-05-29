const cards = document.querySelectorAll(".d-day-card");
const leftBtn = document.getElementById("leftArrow");
const rightBtn = document.getElementById("rightArrow");
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

let currentIndex = 0; // 가운데 원의 인덱스

function updateCarousel() {
  cards.forEach((card, idx) => {
    // 모든 원 초기화
    card.classList.remove("active");
    card.style.opacity = "0.5"; // 기본 투명도 유지
    card.style.zIndex = "1"; // 기본 z-index 설정

    if (idx === currentIndex) {
      // 가운데 원 설정
      card.classList.add("active");
      card.style.left = "50%";
      card.style.transform = "translateX(-50%)";
      card.style.opacity = "1"; // 완전한 불투명도
      card.style.zIndex = "3";
    } else if ((idx === (currentIndex - 1 + cards.length) % cards.length)) {
      // 왼쪽 원 설정
      card.style.left = "calc(50% - 450px)";
      card.style.transform = "none";
      card.style.zIndex = "2";
    } else {
      // 오른쪽 원 설정
      card.style.left = "calc(50% + 50px)";
      card.style.transform = "none";
      card.style.zIndex = "2";
    }
  });
}

// 왼쪽 버튼 클릭 시 순환
leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

// 오른쪽 버튼 클릭 시 순환
rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// 초기화 실행
updateCarousel();
