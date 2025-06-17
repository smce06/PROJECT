// ✅ Kakao SDK 초기화
Kakao.init("d61b73b4ade01cd5c7c857994467bc66"); // 본인 JavaScript 키로 변경
console.log("Kakao SDK 초기화 완료");

// ✅ 카카오 로그인 기능
function kakaoLogin() {
    Kakao.Auth.login({
        success: function(authObj) {
            console.log("로그인 성공:", authObj);

            // ✅ 쿠키 저장 (Secure / SameSite 제거 - 개발용)
            document.cookie = `kakaoToken=${authObj.access_token}; path=/; max-age=3600`;

            getUserInfo(); // 사용자 정보 가져오기
            updateLoginUI(true); // 로그인 UI 업데이트

            // ✅ 페이지 새로고침 (상태 반영)
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 500);
        },
        fail: function(error) {
            console.error("로그인 실패:", error);
        }
    });
}

// ✅ 로그아웃
function kakaoLogout() {
    Kakao.Auth.logout(() => {
        console.log("로그아웃 완료");
        document.cookie = "kakaoToken=; path=/; max-age=0"; // 쿠키 삭제
        updateLoginUI(false);
        window.location.href = "index.html"; // 로그아웃 후 index.html로 이동
    });
}

// ✅ 사용자 정보 요청
function getUserInfo() {
    const token = getCookie("kakaoToken");
    if (!token) {
        console.error("❌ 토큰 없음! 로그인 후 다시 시도.");
        return;
    }

    Kakao.API.request({
        url: '/v2/user/me',
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function(res) {
            console.log("✅ 사용자 정보:", res);
        },
        fail: function(error) {
            console.error("❌ 사용자 정보 가져오기 실패:", error);
        }
    });
}

// ✅ 로그인 상태에 따라 버튼 토글
function updateLoginUI(isLoggedIn) {
    const loginBtn = document.getElementById("kakaoLoginBtn");
    const logoutBtn = document.getElementById("kakaoLogoutBtn");
    const profileIcon = document.querySelector(".profile-icon");

    const isIndex = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

    if (loginBtn) {
        loginBtn.style.display = isIndex && !isLoggedIn ? "inline-block" : "none";
    }

    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    }

    if (profileIcon) {
        profileIcon.style.display = isLoggedIn ? "inline-block" : "none";
    }
}

// ✅ 쿠키 가져오는 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

// ✅ 페이지 로드 시 로그인 상태 반영
window.addEventListener("load", () => {
    const token = getCookie("kakaoToken");
    updateLoginUI(!!token);
});

// ✅ 로그아웃 버튼에 이벤트 등록
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("kakaoLogoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", kakaoLogout);
    }
});

// ✅ 전역에서 호출 가능하게
window.kakaoLogin = kakaoLogin;