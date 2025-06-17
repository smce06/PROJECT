// ✅ D-Day 로직
const carousel = document.querySelector(".carousel");
const applyList = JSON.parse(localStorage.getItem("applyList") || "[]");
let currentIndex = 0;

// ✅ D-Day 계산 함수
function calculateDday(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ✅ 카드 3개만 고정 생성
function createFixedCards() {
  carousel.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const card = document.createElement("div");
    card.className = "d-day-card";
    carousel.appendChild(card);
  }
}

// ✅ 카드 내용 바꾸기
function updateCarousel() {
  const cards = document.querySelectorAll(".d-day-card");
  const total = applyList.length;
  if (total < 1) return;

  const prevIdx = (currentIndex - 1 + total) % total;
  const nextIdx = (currentIndex + 1) % total;
  const indices = [prevIdx, currentIndex, nextIdx];

  cards.forEach((card, i) => {
    const { univ, type, deadline } = applyList[indices[i]];
    const dday = calculateDday(deadline);
    card.innerHTML = `${univ}<br>${type}까지<br><br>D${dday}`;

    card.style.opacity = i === 1 ? "1" : "0.5";
    card.style.zIndex = i === 1 ? "3" : "2";
    card.classList.toggle("active", i === 1);
  });
}

// ✅ 초기화
createFixedCards();
updateCarousel();

// ✅ 캐러셀 버튼
document.getElementById("leftArrow")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + applyList.length) % applyList.length;
  updateCarousel();
});

document.getElementById("rightArrow")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % applyList.length;
  updateCarousel();
});

// ✅ DOM 로드 후 버튼 등록
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const mainBtn = document.getElementById("mainButton");
  const loginBtn = document.getElementById("kakaoLoginBtn");
  const logoutBtn = document.getElementById("kakaoLogoutBtn");

  menuBtn?.addEventListener("click", () => nav?.classList.toggle("show"));
  mainBtn?.addEventListener("click", () => location.href = "index.html");
  loginBtn?.addEventListener("click", () => window.kakaoLogin?.());
  logoutBtn?.addEventListener("click", () => window.kakaoLogout?.());

  // ✅ 로그인 상태에 따라 메뉴 진입 제한
  document.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", e => {
      const token = getCookie("kakaoToken");
      if (!token) {
        e.preventDefault();
        alert("로그인을 하면 이용 가능합니다!");
      }
    });
  });
});

// ✅ 쿠키 헬퍼 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

