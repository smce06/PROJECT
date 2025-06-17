document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
      alert("제목과 글 내용을 모두 입력해주세요.");
      return;
    }

    // 현재 날짜 yyyy-mm-dd 형식
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const createdAt = `${year}-${month}-${day}`;

    const writer = "익명1";

    // 기존 저장된 데이터 가져오기
    const savedData = JSON.parse(localStorage.getItem("communityPosts") || "[]");

    // 새 글 추가
    savedData.push({ title, content, writer, createdAt });

    // 저장
    localStorage.setItem("communityPosts", JSON.stringify(savedData));

    alert("글이 등록되었습니다!");

    // community.html로 이동
    location.href = "community.html";
  });
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