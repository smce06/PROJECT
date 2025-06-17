// ✅ [1] 메뉴 버튼 동작
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// ✅ [2] 카카오 로그인 버튼 동작
const loginBtn = document.getElementById("kakaoLoginBtn");
loginBtn?.addEventListener("click", () => {
  if (typeof window.kakaoLogin === "function") {
    window.kakaoLogin();
  } else {
    console.error("❌ `kakaoLogin` 함수가 정의되지 않았습니다! `auth.js`를 확인하세요.");
  }
});

// ✅ [3] 로그인 필요 페이지 링크 제한
document.querySelectorAll(".page-link").forEach(button => {
  button.addEventListener("click", function (event) {
    const token = getCookie("kakaoToken");
    if (!token) {
      event.preventDefault();
      alert("로그인을 하면 이용 가능합니다!");
    }
  });
});

// ✅ [4] 날짜 차이 계산 함수
function calculateDday(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ✅ [5] applyList 불러와서 캐러셀 생성
const carousel = document.querySelector(".carousel");
const applyList = JSON.parse(localStorage.getItem("applyList") || "[]");

carousel.innerHTML = ""; // 초기화

applyList.slice(0, 5).forEach(({ univ, type, deadline }) => {
  const dday = calculateDday(deadline);
  const card = document.createElement("div");
  card.className = "d-day-card";
  card.innerHTML = `${univ}<br>${type}까지<br><br>D${dday}`;
  carousel.appendChild(card);
});

// ✅ [6] 캐러셀 애니메이션 적용
let currentIndex = 0;
function updateCarousel() {
  const cards = document.querySelectorAll(".d-day-card");
  cards.forEach((card, idx) => {
    card.classList.remove("active");
    card.style.opacity = "0.5";
    card.style.zIndex = "1";

    if (idx === currentIndex) {
      card.classList.add("active");
      card.style.left = "50%";
      card.style.transform = "translateX(-50%)";
      card.style.opacity = "1";
      card.style.zIndex = "3";
    } else if (idx === (currentIndex - 1 + cards.length) % cards.length) {
      card.style.left = "calc(50% - 450px)";
      card.style.transform = "none";
      card.style.zIndex = "2";
    } else {
      card.style.left = "calc(50% + 50px)";
      card.style.transform = "none";
      card.style.zIndex = "2";
    }
  });
}

const leftBtn = document.getElementById("leftArrow");
const rightBtn = document.getElementById("rightArrow");

leftBtn.addEventListener("click", () => {
  const cards = document.querySelectorAll(".d-day-card");
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

rightBtn.addEventListener("click", () => {
  const cards = document.querySelectorAll(".d-day-card");
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

// ✅ 초기 캐러셀 표시
updateCarousel();