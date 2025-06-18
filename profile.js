document.getElementById("saveNicknameBtn").addEventListener("click", () => {
    const nickname = document.getElementById("nicknameInput").value.trim();
    const token = getCookie("kakaoToken");

    if (!nickname) {
        alert("닉네임을 입력하세요.");
        return;
    }

    // 닉네임을 kakaoToken 기반으로 localStorage에 저장
    const nicknameMap = JSON.parse(localStorage.getItem("nicknameMap") || "{}");
    nicknameMap[token] = nickname;
    localStorage.setItem("nicknameMap", JSON.stringify(nicknameMap));

    alert("닉네임이 저장되었습니다.");
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const token = getCookie("kakaoToken");
  const nicknameMap = JSON.parse(localStorage.getItem("nicknameMap") || "{}");
  const nickname = token && nicknameMap[token] ? nicknameMap[token] : "익명";
  const display = document.getElementById("currentNickname");
  if (display) display.textContent = nickname;
});