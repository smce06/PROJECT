document.getElementById("addApplyBtn").addEventListener("click", () => {
  location.href = "myapply_add.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("applyTableBody");
  const applyList = JSON.parse(localStorage.getItem("applyList") || "[]");

  const totalRows = 6;
  tableBody.innerHTML = "";

  applyList.forEach(({ univ, type, competitionrate }) => {
    const row = `<tr><td>${univ}</td><td>${type}</td><td>${competitionrate}</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  const emptyRows = totalRows - applyList.length;
  for (let i = 0; i < emptyRows; i++) {
    const emptyRow = `<tr><td>-</td><td>-</td><td>-</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", emptyRow);
  }
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", () => {
  location.href = "index.html";
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
  location.href = "profile.html";
});


const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});