const nav = document.getElementById("nav");

// myapply.js

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
