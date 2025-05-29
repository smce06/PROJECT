document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const univ = document.getElementById("univ").value.trim();
    const type = document.getElementById("type").value.trim();
    const deadline = document.getElementById("deadline").value;

    if (!univ || !type || !deadline) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const savedData = JSON.parse(localStorage.getItem("applyList") || "[]");

    savedData.push({ univ, type, deadline });

    localStorage.setItem("applyList", JSON.stringify(savedData));

    alert("추가되었습니다!");

    location.href = "myapply.html";
  });
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