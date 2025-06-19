document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const univ  = document.getElementById("univ").value.trim();
    const type  = document.getElementById("type").value.trim();
    const competitionrateInput = document.getElementById("competitionrate").value;
    const competitionrate = parseFloat(competitionrateInput);

    if (!univ || !type || isNaN(competitionrate)) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }

    const savedData = JSON.parse(localStorage.getItem("applyList") || "[]");
    savedData.push({ univ, type, competitionrate });

    localStorage.setItem("applyList", JSON.stringify(savedData));
    alert("추가되었습니다!");

    location.href = "myapply.html";
  });
});

const menuBtn = document.getElementById("menuBtn");
const nav     = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.getElementById("mainButton").addEventListener("click", () => {
  location.href = "index.html";
});

document.querySelector(".profile-icon")?.addEventListener("click", () => {
    window.location.href = "profile.html";
});