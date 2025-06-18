/* ========== 글 작성 폼 처리 ========== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title   = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
      alert("제목과 글 내용을 모두 입력해주세요.");
      return;
    }

    /* 오늘 날짜 yyyy-mm-dd */
    const today  = new Date().toISOString().slice(0, 10);
    const nicknameMap = JSON.parse(localStorage.getItem("nicknameMap") || "{}");
    const token = getCookie("kakaoToken");
    let author = "익명";  // 기본값

    if (token && nicknameMap[token]) {
      author = nicknameMap[token];  // 사용자가 저장한 닉네임
    }

    /* 기존 글 목록 불러오기 */
    const posts = JSON.parse(localStorage.getItem("communityPosts") || "[]");

    posts.push({ title, content, author, date: today });
    localStorage.setItem("communityPosts", JSON.stringify(posts));

    alert("글이 등록되었습니다!");
    location.href = "community.html";
  });
});

const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("show"));

document.getElementById("mainButton").addEventListener("click", () => {
  location.href = "index.html";
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});