document.getElementById("mainButton").addEventListener("click", function() {
    window.location.href = "index.html";
});

const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// 메뉴 버튼 클릭 시 내비게이션 열고 닫기
btn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

const postList = [
  { id: 1, title: "가나다대 면접 후기", author: "지원자1", date: "2025-06-10" },
  { id: 2, title: "나라대는 분위기 좋아요", author: "수험생", date: "2025-06-11" },
];

const tbody = document.getElementById("postList");

postList.forEach((post) => {
  const tr = document.createElement("tr");

  const titleTd = document.createElement("td");
  const titleLink = document.createElement("a");
  titleLink.href = `post.html?id=${post.id}`;
  titleLink.textContent = post.title;
  titleTd.appendChild(titleLink);

  const authorTd = document.createElement("td");
  authorTd.textContent = post.author;

  const dateTd = document.createElement("td");
  dateTd.textContent = post.date;

  tr.appendChild(titleTd);
  tr.appendChild(authorTd);
  tr.appendChild(dateTd);
  tbody.appendChild(tr);
});
