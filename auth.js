// Kakao SDK 초기화
Kakao.init("20a4cb322ca444c9d7f0c2c32254e02c"); // 본인 JavaScript 키로 변경
console.log("Kakao SDK 초기화 완료");

// 카카오 로그인 기능
function kakaoLogin() {
    Kakao.Auth.login({
        success: function(authObj) {
            console.log("로그인 성공:", authObj);
            
            // 로그인 성공 시 토큰 저장
            localStorage.setItem("kakaoToken", authObj.access_token);
            
            getUserInfo(); // 사용자 정보 가져오기 호출
        },
        fail: function(error) {
            console.error("로그인 실패:", error);
        }
    });
}

// 사용자 정보 가져오기
function getUserInfo() {
    const token = localStorage.getItem("kakaoToken"); // 저장된 토큰 가져오기

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
window.kakaoLogin = kakaoLogin;