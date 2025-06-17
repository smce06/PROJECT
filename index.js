const carousel = document.querySelector(".carousel");
const applyList = JSON.parse(localStorage.getItem("applyList") || "[]");
let currentIndex = 0;

function calculateDday(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// 카드 3개만 고정 생성
function createFixedCards() {
  carousel.innerHTML = ""; // 비우고 다시 만듦

  for (let i = 0; i < 3; i++) {
    const card = document.createElement("div");
    card.className = "d-day-card";
    carousel.appendChild(card);
  }
}

// 카드 내용만 바꿔침
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

    // 스타일: 가운데만 강조
    card.style.opacity = i === 1 ? "1" : "0.5";
    card.style.zIndex = i === 1 ? "3" : "2";
    card.classList.toggle("active", i === 1);
  });
}

// 초기화
createFixedCards();
updateCarousel();

document.getElementById("leftArrow").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + applyList.length) % applyList.length;
  updateCarousel();
});

document.getElementById("rightArrow").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % applyList.length;
  updateCarousel();
});
