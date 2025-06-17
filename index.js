// 필요한 요소 가져오기
const cards = document.querySelectorAll(".d-day-card");
const leftBtn = document.getElementById("leftArrow");
const rightBtn = document.getElementById("rightArrow");
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const loginBtn = document.getElementById("kakaoLoginBtn");

// 캐러셀 업데이트 함수
let currentIndex = 0; // 가운데 원의 인덱스
function updateCarousel() {
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
        } else if ((idx === (currentIndex - 1 + cards.length) % cards.length)) {
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

// 버튼 이벤트 추가
leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

btn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

// 초기화 실행
updateCarousel();

// 카카오 로그인 버튼 클릭 이벤트 추가
loginBtn.addEventListener("click", function() {
    if (typeof window.kakaoLogin === "function") {
        window.kakaoLogin(); // 로그인 함수 호출
    } else {
        console.error("❌ `kakaoLogin` 함수가 정의되지 않았습니다! `auth.js`를 확인하세요.");
    }
});

// 페이지 링크 접근 제한 (로그인 필수)
document.querySelectorAll(".page-link").forEach(button => {
    button.addEventListener("click", function(event) {
        const token = getCookie("kakaoToken"); // 쿠키에서 로그인 정보 가져오기

        if (!token) {
            event.preventDefault(); // 기본 링크 이동 막기
            alert("로그인을 하면 이용 가능합니다!"); // 팝업(알림) 띄우기
        } else {
            window.location.href = this.getAttribute("href"); // 정상적으로 페이지 이동
        }
    });
});