// Kakao SDK 초기화
Kakao.init("20a4cb322ca444c9d7f0c2c32254e02c"); // 본인 JavaScript 키로 변경
console.log("Kakao SDK 초기화 완료");

// 카카오 로그인 기능
function kakaoLogin() {
    Kakao.Auth.login({
        success: function(authObj) {
            console.log("로그인 성공:", authObj);

            // 로그인 성공 시 쿠키 저장 (1시간 동안 유지)
            document.cookie = `kakaoToken=${authObj.access_token}; path=/; max-age=3600; SameSite=None; Secure`;

            getUserInfo(); // 사용자 정보 가져오기 호출
            updateLoginUI(true); // 로그인 UI 업데이트
        },
        fail: function(error) {
            console.error("로그인 실패:", error);
        }
    });
}

// 로그아웃 기능 추가
function kakaoLogout() {
    Kakao.Auth.logout(function() {
        console.log("로그아웃 완료");
        document.cookie = "kakaoToken=; path=/; max-age=0"; // 쿠키 삭제
        updateLoginUI(false); // UI 업데이트
    });
}

// 버튼 상태 변경 함수 추가
function updateLoginUI(isLoggedIn) {
    const loginBtn = document.getElementById("kakaoLoginBtn");
    const logoutBtn = document.getElementById("kakaoLogoutBtn");

    if (isLoggedIn) {
        loginBtn.style.display = "none"; // 로그인 버튼 숨기기
        logoutBtn.style.display = "inline-block"; // 로그아웃 버튼 표시
    } else {
        loginBtn.style.display = "inline-block"; // 로그인 버튼 표시
        logoutBtn.style.display = "none"; // 로그아웃 버튼 숨기기
    }
}

// 사용자 정보 가져오기
function getUserInfo() {
    const token = getCookie("kakaoToken"); // 쿠키에서 로그인 정보 가져오기

    if (!token) {
        console.error("토큰이 없습니다! 로그인 후 다시 시도하세요.");
        return;
    }

    Kakao.API.request({
        url: '/v2/user/me',
        headers: {
            Authorization: `Bearer ${token}` // 저장된 토큰 포함
        },
        success: function(res) {
            console.log("사용자 정보:", res);
        },
        fail: function(error) {
            console.error("사용자 정보 가져오기 실패:", error);
        }
    });
}

// 쿠키 가져오는 함수 추가
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// 페이지 로드 시 로그인 상태 확인 후 UI 업데이트
window.addEventListener("load", function () {
    const token = getCookie("kakaoToken"); // 쿠키에서 로그인 정보 가져오기
    updateLoginUI(!!token); // 로그인 상태에 따라 UI 업데이트
});

// 로그아웃 버튼 클릭 이벤트 추가
document.getElementById("kakaoLogoutBtn").addEventListener("click", kakaoLogout);

// 전역으로 등록
window.kakaoLogin = kakaoLogin;