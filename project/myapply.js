document.getElementById("addApplyBtn").addEventListener("click", function () {
  location.href = "myapply_add.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("applyTableBody");
  const applyList = JSON.parse(localStorage.getItem("applyList") || "[]");

  const totalRows = 6;
  tableBody.innerHTML = ""; // 초기 표 비우기

  // 데이터 행 추가
  applyList.forEach(({ univ, type, deadline }) => {
    const row = `<tr><td>${univ}</td><td>${type}</td><td>${deadline}</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // 빈칸 행 채우기
  const emptyRows = totalRows - applyList.length;
  for (let i = 0; i < emptyRows; i++) {
    const emptyRow = `<tr><td>-</td><td>-</td><td>-</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", emptyRow);
  }
});

const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "main.html";
});