const carousel = document.querySelector(".carousel");
const events = JSON.parse(localStorage.getItem("events") || "[]");
let currentIndex = 0;

function calculateDday(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function createFixedCards() {
  carousel.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const card = document.createElement("div");
    card.className = "d-day-card";
    carousel.appendChild(card);
  }
}

function updateCarousel() {
    const cards = document.querySelectorAll(".d-day-card");
    const total = events.length;
    const isLoggedIn = !!getCookie("kakaoToken"); // 로그인 여부 확인

    if (!isLoggedIn) {
      // 로그인 안 했을 때
      cards.forEach((card, i) => {
        card.innerHTML = "?? 일정까지<br>D - ?";
        card.style.transform = `translateX(${(i - 1) * 5}%)`;
        card.style.opacity = i === 1 ? "1" : "0.5";
        card.style.zIndex = i === 1 ? "3" : "2";
        card.classList.toggle("active", i === 1);
      });
      return;
    }

    if (total < 1) {
      // 로그인 했지만 이벤트가 없을 때
      cards.forEach((card, i) => {
        card.innerHTML = "등록된 일정이 없습니다.";
        card.style.transform = `translateX(${(i - 1) * 5}%)`;
        card.style.opacity = i === 1 ? "1" : "0.5";
        card.style.zIndex = i === 1 ? "3" : "2";
        card.classList.toggle("active", i === 1);
      });
      return;
    }

    // 일반 캐러셀 업데이트
    const prevIdx = (currentIndex - 1 + total) % total;
    const nextIdx = (currentIndex + 1) % total;
    const indices = [prevIdx, currentIndex, nextIdx];

    cards.forEach((card, i) => {
      const { title, date } = events[indices[i]];
      const dday = calculateDday(date);
      card.innerHTML = `${title}<br><br>D - ${dday}`;
      card.style.transform = `translateX(${(i - 1) * 5}%)`;
      card.style.opacity = i === 1 ? "1" : "0.5";
      card.style.zIndex = i === 1 ? "3" : "2";
      card.classList.toggle("active", i === 1);
    });
}

// 초기화 및 캐러셀 설정
createFixedCards();
updateCarousel();



// 네비게이션 메뉴 열기/닫기
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("show");
});


//카카오 로그인 기능
function kakaoLogin() {
    Kakao.Auth.login({
        success: function(authObj) {
            console.log("로그인 성공:", authObj);

            document.cookie = `kakaoToken=${authObj.access_token}; path=/; max-age=3600`;

            getUserInfo();
            updateLoginUI(true);
        },
        fail: function(error) {
            console.error("로그인 실패:", error);
        }
    });
}

// 로그아웃 기능
function kakaoLogout() {
    Kakao.Auth.logout(() => {
        console.log("로그아웃 완료");
        document.cookie = "kakaoToken=; path=/; max-age=0"; // 쿠키 삭제
        updateLoginUI(false);
        window.location.href = "index.html"; // 로그아웃 후 홈으로 이동
    });
}

// 사용자 정보 요청
function getUserInfo() {
    const token = getCookie("kakaoToken");
    if (!token) {
        console.error("토큰 없음! 로그인 후 다시 시도.");
        return;
    }

    Kakao.API.request({
        url: '/v2/user/me',
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function(res) {
            console.log("사용자 정보:", res);
        },
        fail: function(error) {
            console.error("사용자 정보 가져오기 실패:", error);
        }
    });
}

function updateLoginUI(isLoggedIn) {
    const loginBtn = document.getElementById("kakaoLoginBtn");
    const logoutBtn = document.getElementById("kakaoLogoutBtn");
    const profileIcon = document.querySelector(".profile-icon");

    const path = window.location.pathname;
    const isIndex = path.endsWith("/") || path.endsWith("/index.html");


    if (loginBtn) loginBtn.style.display = !isLoggedIn ? "inline-block" : "none";
    if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    if (profileIcon) profileIcon.style.display = isLoggedIn ? "inline-block" : "none";
}


// 쿠키 가져오는 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

// 페이지 로드 시 로그인 상태 반영
window.addEventListener("load", () => {
    const token = getCookie("kakaoToken");
    updateLoginUI(!!token);
});

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("kakaoLoginBtn");
    const logoutBtn = document.getElementById("kakaoLogoutBtn");
    const profileIcon = document.querySelector(".profile-icon");
    document.getElementById("leftArrow").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + events.length) % events.length;
      carousel.style.transition = "transform 0.5s ease-in-out";
      updateCarousel();
    });

    document.getElementById("rightArrow").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % events.length;
      carousel.style.transition = "transform 0.5s ease-in-out";
      updateCarousel();
    });
    if (loginBtn) {
        loginBtn.addEventListener("click", kakaoLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", kakaoLogout);
    }
      
    if (profileIcon) {
      profileIcon.addEventListener("click", () => {
        window.location.href = "profile.html";
      });
    }
    document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function(event) {
      const isLoggedIn = !!getCookie("kakaoToken");
      if (!isLoggedIn) {
        event.preventDefault(); // 페이지 이동 막기
        alert("로그인 후 이용이 가능합니다!");
      }
    });
});
    
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});


window.kakaoLogin = kakaoLogin;
window.kakaoLogout = kakaoLogout;


