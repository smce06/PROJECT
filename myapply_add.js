/* -------- 1) 원서 추가 폼 처리 -------- */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const univ  = document.getElementById("univ").value.trim();
    const type  = document.getElementById("type").value.trim();
    const competitionrateInput = document.getElementById("competitionrate").value;
    const competitionrate = parseFloat(competitionrateInput);

    /* 입력값 검증 */
    if (!univ || !type || isNaN(competitionrate)) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }

    /* 기존 데이터 불러오기 & 신규 데이터 추가 */
    const savedData = JSON.parse(localStorage.getItem("applyList") || "[]");
    savedData.push({ univ, type, competitionrate });

    /* 저장 */
    localStorage.setItem("applyList", JSON.stringify(savedData));
    alert("추가되었습니다!");

    /* 목록 페이지로 이동 */
    location.href = "myapply.html";
  });
});

/* -------- 2) 사이드 메뉴 토글 -------- */
const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

/* -------- 3) 로고 클릭 → 메인 이동 -------- */
document.getElementById("mainButton").addEventListener("click", () => {
  location.href = "index.html";
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});