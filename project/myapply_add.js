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
